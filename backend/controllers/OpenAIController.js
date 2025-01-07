const OpenAI = require("openai");
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const User = require("../models/user");

export const maxDuration = 20;
export const dynamic = "edge";

async function createCoverLetter(req, res) {
  const { title, email, company, description, resume } = req.body;
  const maxWords = 300;

  if (!title || !company || !description || !resume || !email) {
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
            content: `You are a cover letter writer. Your task is to create human-like and concise cover letters. 
              To compose a compelling cover letter, scrutinize the job description for key qualifications that are related to the resume. 
              Begin with a succinct introduction about the candidate's identity and career goals. Highlight 
              skills aligned with the job, underpinned by tangible examples. Incorporate details about the company, 
              emphasizing its mission or unique aspects that align with the candidate's values. Conclude by 
              reaffirming the candidate's suitability, inviting further discussion. Please provide your response in under ${maxWords} words based on the information provided.
              
              Job Title: ${title}
              Job Company: ${company}
              Job Description: ${description}`,
          },
          { role: "user", content: `Resume: ${resume}` },
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
