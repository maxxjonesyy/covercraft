const express = require("express");
const router = express.Router();
const { refreshToken } = require("../controllers/TokenController");
const { authenticateToken } = require("../middleware/middleware");

router.get("/refresh-token", authenticateToken, refreshToken);

module.exports = router;
