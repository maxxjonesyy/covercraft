import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { ReactQueryError } from "../types/types";
import { useNavigate } from "react-router-dom";
import { Loader, TickSVG } from "../components/index";
import { useRegisterForm, useAxiosInstance } from "../hooks/index";
import toast from "react-hot-toast";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  passwordMatch: string;
}

function Register() {
  const { formData, handleChange, validateForm } = useRegisterForm();
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  const register = useMutation({
    mutationFn: async (formData: RegisterFormData) =>
      await axiosInstance.post("/register", formData),
    onMutate: () => {
      toast.loading("Creating account...");
    },
    onSuccess: (response) => {
      const { data } = response.data;

      if (data) {
        toast.dismiss();
        toast.success("Account created successfully!");
        navigate("/login");
      }
    },
    onError: (error: ReactQueryError) => {
      if (error?.response?.data?.error === "Password is not strong enough") {
        document.getElementById("password-hint")?.classList.remove("hidden");
      }
    },
  });

  return (
    <motion.form
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) register.mutate(formData);
      }}
      className="container">
      <h1 className="text-3xl mb-2">Create your free account</h1>
      <p>Complete the form below to get started</p>

      <div
        id="password-hint"
        className="hidden mt-5 text-sm max-w-xl bg-red-200/50 p-3 rounded">
        <p className="font-bold">Password must contain:</p>

        <ul className="list-disc list-inside mt-2">
          <li>At least 8 characters</li>
          <li>At least one uppercase letter (A-Z)</li>
          <li>At least one lowercase letter (a-z)</li>
          <li>At least one number (0-9)</li>
          <li>At least one special character</li>
        </ul>
      </div>

      <label htmlFor="name">First name:</label>
      <input
        onChange={handleChange}
        type="text"
        name="name"
        id="name"
        minLength={1}
        maxLength={15}
      />

      <label htmlFor="email">Email:</label>
      <input onChange={handleChange} type="email" name="email" id="email" />

      <label htmlFor="password">Password:</label>
      <input
        onChange={handleChange}
        type="password"
        name="password"
        id="password"
      />

      <label htmlFor="passwordMatch">Confirm password:</label>
      <input
        onChange={handleChange}
        type="password"
        name="passwordMatch"
        id="passwordMatch"
      />

      <button
        type="submit"
        className="flex items-center justify-center gap-5 my-3 w-full max-w-xl bg-accentBlue text-white px-4 py-2 rounded shadow transition-all hover:scale-105">
        {register.isPending && <Loader />}
        Register
      </button>

      <Link to="/login" className="text-sm underline">
        Already have an account?
      </Link>

      <ul className="mt-10">
        <li className="flex gap-2 mt-5">
          <TickSVG />
          <div>
            <p className="font-bold">No monthly subscription</p>
            <p className="text-sm">Only pay for the cover letters you create</p>
          </div>
        </li>

        <li className="flex gap-2 mt-5">
          <TickSVG />
          <div>
            <p className="font-bold">Quick and simple sign up</p>
            <p className="text-sm">
              No payment information required to create an account
            </p>
          </div>
        </li>
      </ul>
    </motion.form>
  );
}

export default Register;
