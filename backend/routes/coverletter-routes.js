const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/middleware");

const {
  getCoverLetters,
  deleteCoverLetter,
  saveCoverLetter,
} = require("../controllers/CoverletterController");

router.get("/savedCoverLetters", authenticateToken, getCoverLetters);
router.post("/savedCoverLetters", authenticateToken, saveCoverLetter);
router.delete("/savedCoverLetters/:id", authenticateToken, deleteCoverLetter);

module.exports = router;
