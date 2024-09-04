import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  passwordMatch: "",
};

function useRegisterForm() {
  const [formData, setFormData] = useState(initialFormState);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function validateForm(): boolean {
    const { name, email, password, passwordMatch } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password || !passwordMatch) {
      toast.error("All fields are required");
      return false;
    }

    const validations = [
      {
        isValid: emailRegex.test(email),
        errorMessage: "Please enter a valid email address",
      },

      {
        isValid: password === passwordMatch,
        errorMessage: "Passwords do not match",
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

export default useRegisterForm;
