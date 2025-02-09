import { ChangeEvent, FormEvent, useEffect, useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ResizableTextArea, Loader } from "../components/index";
import { UserContext } from "../context/UserContext";
import { createSVG } from "../assets/index";
import { extractFileText } from "../utils/index";
import { useAxiosInstance, useCoverLetterForm } from "../hooks/index";
import toast from "react-hot-toast";

interface CoverLetterFormData {
  title: string;
  company: string;
  description: string;
  resume: string;
  grammar: string;
  tone: string;
  preferences?: string;
}
function CoverLetterCreate() {
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const { user, setUser } = useContext(UserContext);

  const [coverLetter, setCoverLetter] = useState("");
  const { formData, setFormData, handleChange, validateForm } =
    useCoverLetterForm();

  const handleCoverletter = useMutation({
    mutationFn: async (formData: CoverLetterFormData) =>
      await axiosInstance.post("/coverLetter", {
        ...formData,
        email: user?.email,
      }),
    onMutate: () => {
      toast.loading("Generating cover letter...");
    },
    onSuccess: (response) => {
      const { data, totalCoverLetters } = response.data;

      if (data) {
        toast.dismiss();

        setUser((prev: any) => {
          return {
            ...prev,
            totalCoverLetters,
            tokenCount: prev.tokenCount - 1,
          };
        });

        setCoverLetter(data);
        toast.success("Cover letter generated successfully!");
      }
    },
  });

  useEffect(() => {
    if (!user) navigate("/login");

    if (coverLetter) {
      let coverLetterCopy = coverLetter;
      navigate("/coverletter/result", { state: { coverLetterCopy, formData } });
    }
  }, [coverLetter]);

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      className="container">
      <h1 className="text-3xl mb-2">Create your cover letter</h1>
      <p>Upload your resume and job details to get started</p>

      <form
        className={`w-full mt-10 ${
          handleCoverletter.isPending && "opacity-60"
        }`}
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          if (validateForm()) handleCoverletter.mutate(formData);
        }}>
        <label htmlFor="resume">Upload resume:</label>
        <input
          type="file"
          name="resume"
          id="resume"
          accept=".pdf"
          className="max-w-3xl block shadow-sm rounded text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-accentBlue file:text-white file:rounded file:border-0 file:me-4 file:py-1.5 file:px-5 file:cursor-pointer"
          onChange={async (e: ChangeEvent<HTMLInputElement>) => {
            const pdfText = await extractFileText(e.target.files?.[0]);

            if (pdfText) {
              setFormData({ ...formData, resume: pdfText });
            }
          }}
        />

        <label htmlFor="title">Job title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="max-w-3xl"
        />

        <label htmlFor="company">Job company:</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="max-w-3xl"
        />

        <label htmlFor="description">Job description:</label>
        <ResizableTextArea
          id="description"
          name="description"
          className="text-sm"
          value={formData.description}
          onChange={handleChange}
        />

        <section className="flex gap-8">
          <div className="space-y-2">
            <label
              htmlFor="grammar"
              className="block text-sm font-medium text-gray-700">
              Grammar preference:
            </label>
            <div className="relative">
              <select
                onChange={handleChange}
                value={formData.grammar}
                name="grammar"
                id="grammar"
                className="w-36 appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="australian">Australian</option>
                <option value="british">British</option>
                <option value="american">American</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="tone"
              className="block text-sm font-medium text-gray-700">
              Tone:
            </label>
            <div className="relative">
              <select
                onChange={handleChange}
                value={formData.tone}
                name="tone"
                id="tone"
                className="w-36 appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-2">
          <label
            htmlFor="preferences"
            className="block text-sm font-medium text-gray-700">
            Custom Preferences (Optional, 150 characters max)
          </label>
          <textarea
            id="preferences"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="Add any specific preferences for your cover letter (e.g., 'Keep it concise' or 'Focus on leadership experience')"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={3}
            maxLength={150}
          />
        </div>

        <button
          type="submit"
          disabled={handleCoverletter.isPending}
          className="flex items-center justify-center gap-2 mt-5 bg-accentBlue text-white px-4 py-2 rounded shadow transition-all hover:scale-105">
          {!handleCoverletter.isPending ? (
            <img src={createSVG} alt="create cover letter" />
          ) : (
            <Loader />
          )}
          Create cover letter
        </button>
      </form>
    </motion.div>
  );
}

export default CoverLetterCreate;
