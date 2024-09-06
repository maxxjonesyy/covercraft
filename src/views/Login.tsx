import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FormEvent } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import useLoginForm from "../hooks/useLoginForm";
import { ReactQueryError } from "../types/types";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const { formData, handleChange, validateForm } = useLoginForm();
  const { login } = useContext(UserContext);

  const handleLogin = useMutation({
    mutationFn: (formData: LoginFormData) => axios.post("/login", formData, {}),
    onMutate: () => {
      toast.loading("Logging in...");
    },
    onSuccess: (response) => {
      const { data } = response.data;

      if (data) {
        login(data);
        toast.dismiss();
        toast.success("Logged in successfully!");
      }
    },
    onError: (error: ReactQueryError) => {
      const errorMessage =
        error?.response?.data?.error || "An unexpected error occurred.";

      toast.dismiss();
      toast.error(errorMessage);
    },
  });

  return (
    <motion.form
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) handleLogin.mutate(formData);
      }}
      className="container">
      <h1 className="text-3xl mb-2">Login</h1>

      <label htmlFor="email">Email:</label>
      <input onChange={handleChange} type="email" name="email" id="email" />

      <label htmlFor="password">Password:</label>
      <input
        onChange={handleChange}
        type="password"
        name="password"
        id="password"
      />

      <button
        type="submit"
        className="flex items-center justify-center gap-5 my-3 max-w-xl w-full max-w-lg bg-accentBlue text-white px-4 py-2 rounded shadow transition-all hover:scale-105">
        {handleLogin.isPending && <Loader />}
        Login
      </button>

      <Link to="/register" className="text-sm underline">
        Don't have an account?
      </Link>
    </motion.form>
  );
}

export default Login;
