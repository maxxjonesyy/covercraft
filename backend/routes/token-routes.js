const express = require("express");
const router = express.Router();
const { refreshToken } = require("../controllers/TokenController");

router.get("/refresh-token", refreshToken);

module.exports = router;
