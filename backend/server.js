require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectMongoDB = require("./database/mongo");
const { escapeInputs } = require("./middleware/middleware");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://covercraft-mj.netlify.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Origin:", origin);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use("/webhook", bodyParser.raw({ type: "application/json" }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(escapeInputs);

app.use("/", require("./routes/openai-routes"));
app.use("/", require("./routes/token-routes"));
app.use("/", require("./routes/user-routes"));
app.use("/", require("./routes/coverletter-routes"));
app.use("/", require("./routes/stripe-routes"));

connectMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB:", error);
  });

module.exports = app;
