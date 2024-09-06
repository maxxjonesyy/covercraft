require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectMongoDB = require("./database/mongo");
const { escapeInputs } = require("./middleware/middleware");

const PORT = process.env.PORT || 8080;
const app = express();

const allowedOrigins = [
  process.env.LOCAL_ENV1,
  process.env.LOCAL_ENV2,

  //   Production URL will go here
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(cors(corsOptions));
app.use(escapeInputs);

app.use("/", require("./routes/openai-routes"));
app.use("/", require("./routes/token-routes"));
app.use("/", require("./routes/user-routes"));

connectMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB:", error);
  });
