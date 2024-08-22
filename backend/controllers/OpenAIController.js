const OpenAI = require("openai");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const createCoverLetter = async (req, res) => {
  const { title, company, description, resume } = req.body;

  if (!title || !company || !description || !resume) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a cover letter generator. Your task is to create human-like and concise cover letters. 
              To compose a compelling cover letter, scrutinize the job description for key qualifications that are related to the resume. 
              Begin with a succinct introduction about the candidate's identity and career goals. Highlight 
              skills aligned with the job, underpinned by tangible examples. Incorporate details about the company, 
              emphasizing its mission or unique aspects that align with the candidate's values. Conclude by 
              reaffirming the candidate's suitability, inviting further discussion. Please provide your response in under 250 words based on the information provided.
              
              Job Title: ${title}
              Job Company: ${company}
              Job Description: ${description}`,
        },
        {
          role: "user",
          content: `Resume: ${resume}`,
        },
      ],
      model: "gpt-4o-mini",
    });

    if (completion.choices[0]) {
      res.status(200).json(completion.choices[0].message.content);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCoverLetter };
