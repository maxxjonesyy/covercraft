const express = require("express");
const router = express.Router();
const { createCoverLetter } = require("../controllers/OpenAIController");
const { authenticateToken } = require("../middleware/middleware");

router.post("/coverLetter", authenticateToken, createCoverLetter);

module.exports = router;
