import stripe from "../config/stripe.js";
import paypal from "../config/paypal.js";
import Payment from "../models/Payment.js";
import ExpressError from '../utils/expressError.js'

// ✅ Stripe Checkout
export const createStripeCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;

    // total amount
    const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // create session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.price * 100, // cents
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    // save payment in DB
    await Payment.create({
      user: req.user._id,
      provider: "stripe",
      amount,
      status: "pending",
      transactionId: session.id,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ PayPal Payment
export const createPaypalPayment = (req, res) => {
  const { amount } = req.body;

  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: `${process.env.SERVER_URL}/api/payments/paypal/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Pro Subscription",
              sku: "001",
              price: amount,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: { currency: "USD", total: amount },
        description: "Pro plan payment",
      },
    ],
  };

  paypal.payment.create(create_payment_json, async (error, payment) => {
    if (error) {
      res.status(500).json({ error: error.response });
    } else {
      // save in DB as pending
      await Payment.create({
        user: req.user._id,
        provider: "paypal",
        amount,
        status: "pending",
        transactionId: payment.id,
      });

      const approvalUrl = payment.links.find((link) => link.rel === "approval_url").href;
      res.json({ url: approvalUrl });
    }
  });
};

// ✅ PayPal Success
export const paypalSuccess = (req, res) => {
  const { paymentId, PayerID, userId } = req.query;

  const execute_payment_json = { payer_id: PayerID };

  paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
    if (error) {
      // update as failed
      await Payment.findOneAndUpdate(
        { transactionId: paymentId },
        { status: "failed" }
      );
      return res.redirect(`${process.env.CLIENT_URL}/cancel`);
    } else {
      // update as completed
      await Payment.findOneAndUpdate(
        { transactionId: paymentId },
        { status: "completed" }
      );
      return res.redirect(`${process.env.CLIENT_URL}/success`);
    }
  });
};

// ✅ User Payment History
export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Stripe Webhook
export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // stripe dashboard se lo
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      // ✅ Update Payment in DB
      await Payment.findOneAndUpdate(
        { transactionId: session.id },
        { status: "completed" }
      );

      console.log("✅ Payment completed:", session.id);
      break;

    case "checkout.session.expired":
      const expired = event.data.object;

      await Payment.findOneAndUpdate(
        { transactionId: expired.id },
        { status: "failed" }
      );

      console.log("❌ Payment expired:", expired.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};



export const allPayments = async(req, res)=>{
 const payments = await Payment.find()
      .populate("user", "username email role") // only select useful fields
      .lean()
      .sort({ createdAt: -1 });

    if (!payments || payments.length === 0) {
      throw new ExpressError("No payments found", 404);
    }

    return res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });

}