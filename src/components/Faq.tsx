import { useState } from "react";

const faqs = [
  {
    q: "Can I try it for free?",
    a: "Absolutely, when you sign up you'll get a free cover letter on us to give it a go",
  },
  {
    q: "How does payment work?",
    a: "It's simple, no subscription or surprises. Simply pay for the tokens (cover letters) and you're good to go",
  },
  {
    q: "How long does it take to generate a cover letter?",
    a: "Most cover letters are generated in under 6 seconds. Just upload your resume, paste the job description, and let AI do the work.",
  },
  {
    q: "Can I customise the generated cover letter?",
    a: "Yes! You can edit any part of the generated letter, adjust the tone, or regenerate specific sections until it's perfect.",
  },
  {
    q: "What file formats are supported?",
    a: "At the moment we are only supporting PDF, if you have a DOC file there are many tools available to quickly convert it for you.",
  },
  {
    q: "Is my data secure and private?",
    a: "Absolutely. We use industry-standard encryption and never share your personal information or documents with third parties. We do not store any payment information, that is handled entirely though Stripe.",
  },
];

function Faq() {
  const [activeQuestion, setActiveQuestion] = useState(undefined);

  const toggleQuestion = (index: any) => {
    setActiveQuestion(activeQuestion === index ? undefined : index);
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">FAQ</h1>

          <div className="mb-12 text-center">
            <p>
              Still have questions?{" "}
              <a
                href="/contact"
                className="text-accentBlue underline transition-colors">
                Contact us directly
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-lg rounded-xl border border-black/50 overflow-hidden transition-all duration-300 hover:bg-white/15 hover:border-accentBlue/50">
              <button
                onClick={() => toggleQuestion(i)}
                className="w-full px-6 py-3 flex items-center justify-between text-left transition-all duration-300">
                <span className="text-base font-semibold">{faq.q}</span>
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full bg-accentBlue flex items-center justify-center transition-all duration-300 ${
                    activeQuestion === i ? "rotate-180 bg-accentBlue" : ""
                  }`}>
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`text-left transition-all duration-300 ease-in-out ${
                  activeQuestion === i
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}>
                <div className="px-6 pt-2 pb-3 text-sm">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;
