// controllers/paymentController.js
import paymentService from "../services/paymentServices.js";
import userService from "../services/userServices.js";
// import { getUserIdentifier } from "../middleware/authMiddleware.js";

class PaymentController {
  // ... other methods left unchanged ...

  // Process mock payment (accepts paymentIntentId OR amount).
  // If no paymentIntentId provided, creates a mock payment intent internally,
  // then processes it and marks the user as paid on success.
  async processMockPayment(req, res) {
    try {
      const userIdentifier = req.user;
      // accept either paymentIntentId (from a prior create) or just amount
      const { paymentIntentId, amount = 9.99, currency = "USD" } = req.body;

      let piId = paymentIntentId;

      // If no payment intent was provided, create a mock one for the requested amount.
      if (!piId) {
        const created = await paymentService.createPaymentIntent(
          amount,
          currency
        );
        piId = created.id;
      }

      console.log(
        `Processing mock payment for user: ${userIdentifier} with PI: ${piId}`
      );

      // Process mock payment
      const paymentResult = await paymentService.processMockPayment(piId);

      if (paymentResult.status === "succeeded") {
        // Mark user as paid
        await userService.markAsPaid(userIdentifier, {
          paymentIntentId: paymentResult.id,
          amount: paymentResult.amount / 100, // Convert cents to dollars
          currency: paymentResult.currency,
          paidAt: new Date(paymentResult.created * 1000).toISOString(),
        });

        const userStats = await userService.getUserStats(userIdentifier);

        res.json({
          success: true,
          message: "Payment successful! You now have unlimited conversions.",
          paymentStatus: "succeeded",
          userStats,
        });
      } else {
        res.status(400).json({
          success: false,
          error: "Payment failed",
          paymentStatus: paymentResult.status,
        });
      }
    } catch (error) {
      console.error("Mock Payment Error:", error);
      res.status(500).json({
        success: false,
        error: "Payment processing failed",
      });
    }
  }

  // ... other methods ...
}

const paymentController = new PaymentController();
export default paymentController;
