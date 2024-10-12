const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/middleware");

const {
  register,
  login,
  updateProfile,
} = require("../controllers/UserController");

router.post("/register", register);
router.post("/login", login);
router.post("/profile", authenticateToken, updateProfile);

module.exports = router;
