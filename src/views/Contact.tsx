import * as yup from "yup";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Loader } from "../components";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";

type FormData = {
  name: string;
  email: string;
  enquiry_type: string;
  message: string;
};

const enquiryTypes = ["general", "feedback", "other"];

const formSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(15, "Name cannot exceed 15 characters")
    .required("Name is required"),
  email: yup
    .string()
    .trim()
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),
  enquiry_type: yup
    .string()
    .oneOf(enquiryTypes, "Invalid enquiry type")
    .required("Enquiry type is required"),
  message: yup
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message cannot exceed 500 characters")
    .required("Message is required"),
});

function Contact() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const handleRecaptchaChange = (token: string | null): void => {
    setRecaptchaToken(token);
  };

  const onSubmit = async (data: FormData) => {
    if (!recaptchaToken) return;
    setIsLoading(true);

    try {
      const formData = { ...data, "g-recaptcha-response": recaptchaToken };

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      if (result.text === "OK") {
        reset();
        setRecaptchaToken(null);
        toast.success("Email sent!");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Error sending email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      className="container">
      <h1 className="text-3xl mb-2">Send us a message</h1>
      <p className="mb-10">
        Any questions or feedback? We'd love to hear from you!
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          {...register("name")}
          className={`${errors.name && "border-red-500"} min-w-full`}
        />
        {<ErrorText text={errors.name?.message} />}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email")}
          className={`${errors.email && "border-red-500"} min-w-full`}
        />
        {<ErrorText text={errors.email?.message} />}

        <label htmlFor="enquiry_type">Type of enquiry</label>
        <select
          {...register("enquiry_type")}
          className="min-w-full p-2 border border-gray-300 rounded">
          <option value="" className="hidden">
            Select an option
          </option>
          <option value="general">General</option>
          <option value="feedback">Feedback</option>
          <option value="other">Other</option>
        </select>
        {<ErrorText text={errors.enquiry_type?.message} />}

        <label htmlFor="message">Message</label>
        <textarea
          {...register("message")}
          rows={10}
          className={`${errors.message && "border-red-500"}`}
        />
        {<ErrorText text={errors.message?.message} />}

        {isValid && (
          <div id="recaptcha-container" className="mx-auto mt-5">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
            />
          </div>
        )}

        <button
          type="submit"
          className="flex items-center justify-center max-w-fit gap-2 mt-3 bg-accentBlue text-white px-4 py-2 rounded shadow transition-all hover:scale-105 hover:cursor-pointer">
          {isLoading && <Loader size={18} />}
          {isLoading ? "Sending..." : "Send message"}
        </button>
      </form>
    </motion.section>
  );
}

export default Contact;

function ErrorText({ text }: { text: string | undefined }) {
  if (!text) {
    return null;
  }

  return <p className="my-2 text-sm text-red-500">{text}</p>;
}
