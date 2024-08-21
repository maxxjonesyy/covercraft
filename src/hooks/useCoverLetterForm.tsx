import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const initialFormState = {
  title: "",
  company: "",
  description: "",
  resume: "",
};

function useCoverLetterForm() {
  const [formData, setFormData] = useState(initialFormState);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function validateForm(): boolean {
    const { title, company, description, resume } = formData;

    if (!title || !company || !description || !resume) {
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
