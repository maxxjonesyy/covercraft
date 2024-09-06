const validator = require("validator");
const jwt = require("jsonwebtoken");

function escapeInputs(req, res, next) {
  for (const key in req.body) {
    if (typeof req.body[key] === "string") {
      req.body[key] = validator.escape(req.body[key]);
    }
  }

  next();
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (tokenError) => {
    if (tokenError) {
      return res.status(401).json({ error: "Expired access token" });
    }

    next();
  });
}

module.exports = { escapeInputs, authenticateToken };
