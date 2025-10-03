import express from "express";
import {
  createStripeCheckoutSession,
  createPaypalPayment,
  paypalSuccess,
  getUserPayments,
  allPayments,
} from "../controllers/paymentController.js";
import { stripeWebhook } from "../controllers/paymentController.js";
import { auth, isAdmin } from "../middleware/auth.js";
import wrapAsync from '../utils/wrapAsync.js'

const router = express.Router();

// Stripe
router.post("/stripe/create-checkout-session", auth("user"), createStripeCheckoutSession);

// PayPal
router.post("/paypal/pay", auth("user"), createPaypalPayment);
router.get("/paypal/success", auth("user"), paypalSuccess);

// Payment history
router.get("/history", auth("user"), getUserPayments);


router.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }), // stripe needs raw body
  stripeWebhook
);

router.get('/allpayments', auth("admin"), isAdmin, wrapAsync(allPayments) )


export default router;
