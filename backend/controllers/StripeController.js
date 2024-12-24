const Stripe = require("stripe");
const jwt = require("jsonwebtoken");
const { addTokensToUser, getTokens } = require("../controllers/UserController");
const User = require("../models/user");

const env = process.env.ENVIRONMENT;

const stripe = Stripe(
  env === "production"
    ? process.env.STRIPE_LIVE_KEY
    : process.env.STRIPE_TEST_KEY
);

async function createCheckoutSession(req, res) {
  const { priceId } = req.body;
  const token = req.headers["authorization"]?.split(" ")[1];

  const domain =
    env === "production"
      ? "https://covercraft-mj.netlify.app/"
      : "http://localhost:5173/";

  let decodedEmail;

  if (!priceId) {
    return res.status(400).json({ error: "No product ID found" });
  }

  if (!token) {
    return res.status(400).json({ error: "No token found" });
  }

  try {
    decodedEmail = jwt.decode(token)?.email;
  } catch (error) {
    return res.status(400).json({ error: "Invalid token provided" });
  }

  if (!decodedEmail) {
    return res.status(400).json({ error: "No email found in the token" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      currency: "AUD",
      mode: "payment",
      success_url: `${domain}payment/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}token/?canceled=true`,
      customer_email: decodedEmail,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
}

async function verifyPayment(req, res) {
  try {
    const { sessionId } = req.params;
    const { email } = req.query;

    if (!sessionId || !email) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const order = user.orders.find((order) => order.sessionId === sessionId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const tokens = await getTokens(email);
    return res.status(200).json(tokens);
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function paymentWebhook(req, res) {
  const endpointSecret =
    env === "production"
      ? process.env.STRIPE_LIVE_WEBHOOK_SECRET
      : process.env.STRIPE_TEST_WEBHOOK_SECRET;

  try {
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      endpointSecret
    );

    if (event.type === "checkout.session.completed") {
      const charge = event.data.object;
      const email = charge.customer_email;
      const sessionId = charge.id;

      const lineItem = await stripe.checkout.sessions.listLineItems(sessionId);
      const tokensToAdd = Number(lineItem.data[0].description.split(" ")[0]);

      const user = await User.findOne({ email });

      user.orders.push({
        sessionId,
        tokensBought: tokensToAdd,
        createdAt: new Date(),
      });

      await Promise.all([
        await user.save(),
        await addTokensToUser(email, tokensToAdd),
      ]);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error(`paymentWebHook failed: ${err.message}`);
  }
}

module.exports = { createCheckoutSession, paymentWebhook, verifyPayment };
