// // routes/payment.js
// import express from "express";
// import paymentController from "../controllers/paymentController.js";

// const router = express.Router();

// // Create payment intent
// router.post("/create-intent", paymentController.createPaymentIntent);

// // Process mock payment (for testing)
// router.post("/mock-payment", paymentController.processMockPayment);

// // Get pricing
// router.get("/pricing", paymentController.getPricing);

// export default router;

// routes/payment.js
import express from "express";
import paymentController from "../controllers/paymentController.js";

const router = express.Router();

// Only mock payment route for now
router.post("/mock-payment", paymentController.processMockPayment);

export default router;
