const OpenAI = require("openai");
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const User = require("../models/user");

async function createCoverLetter(req, res) {
  const {
    title,
    email,
    company,
    description,
    resume,
    grammar,
    tone,
    preferences,
  } = req.body;
  const maxWords = 300;

  if (
    !title ||
    !company ||
    !description ||
    !resume ||
    !email ||
    !grammar ||
    !tone
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.tokenCount <= 0) {
      return res.status(400).json({
        error: "Insufficient tokens. Please purchase more and try again.",
      });
    }

    const withTimeout = (promise, timeoutMs) => {
      return Promise.race([
        promise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
        ),
      ]);
    };

    const completion = await withTimeout(
      openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an expert cover letter writer. Your task is to craft professional, engaging, and ATS-friendly cover letters. 
    
              - Ensure the grammar is **${
                grammar || "flawless"
              }** and the tone is **${tone || "professional yet personable"}**.
              - Follow these **preferences** when writing: ${
                preferences || "No specific preferences provided"
              }.
              - Carefully analyze the job description to extract key qualifications that match the candidate's resume.
              - Structure the cover letter as follows:
                1. **Introduction**: Briefly introduce the candidate and their career goals.
                2. **Skills & Experience**: Highlight relevant skills with concrete examples demonstrating why they are a strong fit.
                3. **Company Alignment**: Include details about the company, such as its mission or values, and align them with the candidate’s interests.
                4. **Conclusion**: Reinforce why the candidate is an ideal choice and invite further discussion.
    
              Keep the response concise, compelling, and within **${
                maxWords || 250
              } words**.
    
              **Job Details:**
              - **Title**: ${title || "N/A"}
              - **Company**: ${company || "N/A"}
              - **Description**: ${description || "N/A"}
    
              **Candidate Resume**: ${resume || "Not provided"}
            `,
          },
        ],
      }),
      18000
    );

    const response = completion.choices?.[0]?.message?.content;

    if (!response) {
      return res
        .status(500)
        .json({ error: "Failed to generate cover letter." });
    }

    user.totalCoverLetters += 1;
    user.tokenCount -= 1;
    await user.save();

    res.status(200).json({
      data: response,
      totalCoverLetters: user.totalCoverLetters,
    });
  } catch (error) {
    console.error("Error generating cover letter:", error);
    const errorMessage =
      error.message === "Request timed out"
        ? "The request timed out. Please try again later."
        : "Internal server error. Please try again later.";
    res.status(500).json({ error: errorMessage });
  }
}

module.exports = { createCoverLetter };
