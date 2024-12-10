const express = require("express");
const router = express.Router();

const {
  createCheckoutSession,
  paymentWebhook,
} = require("../controllers/StripeController");
const { authenticateToken } = require("../middleware/middleware");

router.post(
  "/create-checkout-session",
  authenticateToken,
  createCheckoutSession
);

router.post("/webhook", paymentWebhook);

module.exports = router;
