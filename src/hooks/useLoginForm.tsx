import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const initialFormState = {
  email: "",
  password: "",
};

function useLoginForm() {
  const [formData, setFormData] = useState(initialFormState);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function validateForm() {
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("All fields are required");
      return false;
    }

    return true;
  }

  return { formData, setFormData, handleChange, validateForm };
}

export default useLoginForm;
