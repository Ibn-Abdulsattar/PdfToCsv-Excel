// services/paymentService.js
class PaymentService {
  constructor() {
    this.paymentMethods = {
      stripe: false, // Set to true when Stripe is configured
      paypal: false, // Set to true when PayPal is configured
      razorpay: false, // Set to true when Razorpay is configured
      mock: true, // Mock payment for testing
    };

    this.pricing = {
      unlimitedAccess: {
        price: 9.99,
        currency: "USD",
        description: "Unlimited PDF conversions",
      },
    };
  }

  // Create payment intent (mock for now)
  async createPaymentIntent(amount, currency = "USD") {
    // Mock payment creation
    const paymentIntent = {
      id: `pi_mock_${Date.now()}`,
      amount: amount * 100, // Convert to cents
      currency: currency.toLowerCase(),
      status: "requires_payment_method",
      client_secret: `pi_mock_${Date.now()}_secret_${Math.random()
        .toString(36)
        .substring(7)}`,
    };

    console.log("Mock Payment Intent Created:", paymentIntent);
    return paymentIntent;
  }

  // Process mock payment
  async processMockPayment(paymentIntentId) {
    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock successful payment
    return {
      id: paymentIntentId,
      status: "succeeded",
      amount: 999, // $9.99 in cents
      currency: "usd",
      created: Math.floor(Date.now() / 1000),
      paid: true,
    };
  }

  // Get pricing info
  getPricing() {
    return this.pricing;
  }

  // Verify payment (mock)
  async verifyPayment(paymentIntentId) {
    // In real implementation, verify with payment provider
    console.log(`Verifying payment: ${paymentIntentId}`);
    return {
      verified: true,
      amount: 9.99,
      currency: "USD",
      status: "succeeded",
    };
  }
}

const paymentService = new PaymentService();
export default paymentService;
