const User = require("../models/user");

async function getCoverLetters(req, res) {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });

    return res.status(200).json(user.savedCoverLetters);
  } catch (error) {
    console.error("Error fetching cover letters:", "error)");
    res
      .status(500)
      .json({ error: "An error occurred while fetching cover letters" });
  }
}

async function deleteCoverLetter(req, res) {
  const { id } = req.params;
  const { email } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Error deleting, no id provided" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  try {
    user.savedCoverLetters = user.savedCoverLetters.filter(
      (letter) => letter.id !== id
    );
    await user.save();
    res.status(200).json({ data: "Cover letter deleted" });
  } catch (error) {
    console.error("Error deleting cover letter:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting cover letter" });
  }
}

async function saveCoverLetter(req, res) {
  const { title, company, coverLetter, email } = req.body;

  if (!title || !company || !coverLetter) {
    return res
      .status(400)
      .json({ error: "Error saving, all fields are required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  try {
    const coverLetterData = {
      title,
      company,
      coverLetter,
    };

    user.savedCoverLetters.push(coverLetterData);
    await user.save();

    res.status(200).json({ data: "Cover letter saved" });
  } catch (error) {
    console.error("Error saving cover letter:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving cover letter" });
  }
}

module.exports = {
  getCoverLetters,
  deleteCoverLetter,
  saveCoverLetter,
};
