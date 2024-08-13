const express = require("express");
const router = express.Router();
const { createCoverLetter } = require("../controllers/OpenAIController");

router.post("/coverletter", createCoverLetter);

module.exports = router;
