import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FormEvent } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Loader } from "../components/index";
import toast from "react-hot-toast";
import useLoginForm from "../hooks/useLoginForm";
import useAxiosInstance from "../hooks/useAxiosInstance";

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const { formData, handleChange, validateForm } = useLoginForm();
  const axiosInstance = useAxiosInstance();
  const { login } = useContext(UserContext);

  const handleLogin = useMutation({
    mutationFn: async (formData: LoginFormData) =>
      await axiosInstance.post("/login", formData),
    onMutate: () => {
      toast.loading("Logging in...");
    },
    onSuccess: (response) => {
      const { data } = response.data;

      if (data) {
        toast.dismiss();
        login(data);
        toast.success("Logged in successfully!");
      }
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
