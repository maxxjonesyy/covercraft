const OpenAI = require("openai");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const createCoverLetter = async (req, res) => {
  const { title, description, resume } = req.body;

  if (!title || !description || !resume) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a cover letter generator. Your task is to create human-like and concise cover letters. 
              To compose a compelling cover letter, scrutinize the job description for key qualifications. 
              Begin with a succinct introduction about the candidate's identity and career goals. Highlight 
              skills aligned with the job, underpinned by tangible examples. Incorporate details about the company, 
              emphasizing its mission or unique aspects that align with the candidate's values. Conclude by 
              reaffirming the candidate's suitability, inviting further discussion. Use job-specific terminology 
              for a tailored and impactful letter, maintaining a professional style suitable for a ${title}. 
              Please provide your response in under 300 words.`,
        },
        {
          role: "system",
          content: `Job Title: ${title}, Job Description: ${description}`,
        },
        {
          role: "user",
          content: `Resume: ${resume}`,
        },
      ],
      model: "gpt-4o-mini",
    });

    if (completion.choices[0]) {
      res.status(200).json({ data: completion.choices[0].message.content });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCoverLetter };
