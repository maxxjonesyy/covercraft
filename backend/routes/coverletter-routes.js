const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/middleware");

const {
  getCoverLetters,
  saveCoverLetter,
} = require("../controllers/CoverletterController");

router.get("/savedCoverLetters", authenticateToken, getCoverLetters);
router.post("/savedCoverLetters", authenticateToken, saveCoverLetter);

module.exports = router;
