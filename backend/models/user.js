const mongoose = require("mongoose");

const coverLetterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  coverLetter: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokenCount: { type: Number, default: 0 },
  totalCoverLetters: { type: Number, default: 0 },
  savedCoverLetters: [coverLetterSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
