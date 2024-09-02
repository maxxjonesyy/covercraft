const validator = require("validator");

function escapeInputs(req, res, next) {
  for (const key in req.body) {
    if (typeof req.body[key] === "string") {
      req.body[key] = validator.escape(req.body[key]);
    }
  }

  next();
}

module.exports = { escapeInputs };
