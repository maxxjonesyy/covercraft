const express = require("express");
const router = express.Router();

const {
  createCheckoutSession,
  verifyPayment,
  paymentWebhook,
} = require("../controllers/StripeController");
const { authenticateToken } = require("../middleware/middleware");

router.post(
  "/create-checkout-session",
  authenticateToken,
  createCheckoutSession
);

router.get("/verify-payment/:sessionId", authenticateToken, verifyPayment);

router.post("/webhook", paymentWebhook);

module.exports = router;
