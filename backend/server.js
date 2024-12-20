require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectMongoDB = require("./database/mongo");
const { escapeInputs } = require("./middleware/middleware");
const bodyParser = require("body-parser");
const { router: sseRouter } = require("./routes/sse-route");

const PORT = process.env.PORT || 8080;
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://covercraft-mj.netlify.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.error("CORS Error: Origin not allowed", origin); // Debugging
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  optionsSuccessStatus: 204, // Some browsers expect 204 for preflight
};

// Apply CORS globally
app.use(cors(corsOptions));

// Explicitly handle preflight requests
app.options("*", cors(corsOptions));

// Middleware configuration
app.use("/webhook", bodyParser.raw({ type: "application/json" }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(escapeInputs);

// Routes
app.use("/", require("./routes/openai-routes"));
app.use("/", require("./routes/token-routes"));
app.use("/", require("./routes/user-routes"));
app.use("/", require("./routes/coverletter-routes"));
app.use("/", require("./routes/stripe-routes"));
app.use("/", sseRouter);

// Debugging middleware for error handling
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).send("Internal Server Error");
});

// Connect to MongoDB and start server
connectMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB:", error);
  });
