const Stripe = require("stripe");
const jwt = require("jsonwebtoken");
const { addTokensToUser, getTokens } = require("../controllers/UserController");
const { broadcastMessage } = require("../routes/sse-route");

const stripe = Stripe(process.env.STRIPE_TEST_KEY);

async function createCheckoutSession(req, res) {
  const { priceId } = req.body;
  const token = req.headers["authorization"]?.split(" ")[1];
  const domain = "http://localhost:5173/";

  let decodedEmail;

  if (!priceId) {
    return res.status(400).json({ error: "No product ID found." });
  }

  if (!token) {
    return res.status(400).json({ error: "No token found." });
  }

  try {
    decodedEmail = jwt.decode(token)?.email;
  } catch (error) {
    return res.status(400).json({ error: "Invalid token provided." });
  }

  if (!decodedEmail) {
    return res.status(400).json({ error: "No email found in the token." });
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
      success_url: `${domain}token/?success=true`,
      cancel_url: `${domain}token/?canceled=true`,
      customer_email: decodedEmail,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Failed to create checkout session." });
  }
}

let isAlreadyProcessing;
let event;
async function paymentWebhook(req, res) {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const signature = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);

    if (!isAlreadyProcessing) {
      broadcastMessage({
        message: "Processing payment...",
      });

      isAlreadyProcessing = true;
    }

    if (event.type === "checkout.session.completed") {
      const charge = event.data.object;
      const email = charge.customer_email;
      const sessionId = charge.id;

      const lineItem = await stripe.checkout.sessions.listLineItems(sessionId);
      const tokensToAdd = lineItem.data[0].description.split(" ")[0];

      await addTokensToUser(email, tokensToAdd);
      const updatedTokens = await getTokens(email);

      broadcastMessage({
        message: "Payment complete!",
        updatedTokens,
      });
    }

    res.status(200).json({ received: true });
  } catch (err) {
    broadcastMessage({ message: "Payment failed" });
    console.error(`Webhook signature verification failed: ${err.message}`);
  }
}

module.exports = { createCheckoutSession, paymentWebhook };
