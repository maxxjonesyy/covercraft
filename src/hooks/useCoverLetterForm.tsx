import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const initialFormState = {
  title: "",
  company: "",
  description: "",
  resume: "",
  grammar: "australian",
  tone: "professional",
  preferences: "",
};

function useCoverLetterForm() {
  const [formData, setFormData] = useState(initialFormState);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function validateForm(): boolean {
    const { title, company, description, resume, grammar, tone, preferences } =
      formData;

    if (!title || !company || !description || !resume || !grammar || !tone) {
      toast.error("All fields are required");
      return false;
    }

    const validations = [
      {
        isValid: title.length >= 5,
        errorMessage: "Title must be at least 5 characters",
      },
      {
        isValid: company.length >= 5,
        errorMessage: "Company name must be at least 5 characters",
      },
      {
        isValid: description.length >= 100,
        errorMessage: "Description must be at least 100 characters",
      },
      {
        isValid: resume.length >= 100,
        errorMessage: "Resume must be at least 100 characters",
      },
      {
        isValid:
          grammar === "australian" ||
          grammar === "british" ||
          grammar === "american",
        errorMessage: "Please select a valid grammar option",
      },
      {
        isValid: tone === "professional" || tone === "casual",
        errorMessage: "Please select a valid tone option",
      },
      {
        isValid: preferences.length <= 150,
        errorMessage: "Preferences must be at most 150 characters",
      },
    ];

    for (let { isValid, errorMessage } of validations) {
      if (!isValid) {
        toast.error(errorMessage);
        return false;
      }
    }

    return true;
  }

  return { formData, setFormData, handleChange, validateForm };
}

export default useCoverLetterForm;
