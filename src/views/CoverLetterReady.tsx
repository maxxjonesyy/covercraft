import { useEffect, useState, useRef, ChangeEvent, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ResizableTextArea, Button } from "../components/index";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import backArrowSVG from "../assets/icons/back-arrow.svg";
import clickToCopySVG from "../assets/icons/click-to-copy.svg";
import saveSVG from "../assets/icons/save.svg";
import downloadSVG from "../assets/icons/download.svg";
import editSVG from "../assets/icons/edit.svg";
import useAxiosInstance from "../hooks/useAxiosInstance";
import downloadAsDOC from "../utils/downloadAsDOC";
import copyToClipboard from "../utils/copyToClipboard";

function CoverLetterReady() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxiosInstance();

  const clickToCopyRef = useRef<HTMLDivElement>(null);
  let { formData, coverLetterCopy } = location.state;

  const [editMode, setEditMode] = useState(false);
  const [coverLetter, setCoverLetter] = useState(coverLetterCopy);

  function animateClickToCopy() {
    if (clickToCopyRef.current) {
      clickToCopyRef.current.classList.toggle("right-[-100%]");
      clickToCopyRef.current.classList.toggle("right-[0%]");
    }
  }

  const saveCoverLetter = useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/savedCoverLetters", {
        title: formData.title,
        company: formData.company,
        coverLetter,
        email: user?.email,
      });
    },
    onMutate: () => {
      toast.loading("Saving cover letter...");
    },

    onSuccess: () => {
      toast.dismiss();
      toast.success("Cover letter saved");
    },
  });

  useEffect(() => {
    if (!coverLetter || !formData) {
      navigate("/coverletter");
    }
  }, []);

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      className="container">
      <div className="mb-10">
        <Button
          text="Back to form"
          image={{ url: backArrowSVG, alt: "back to form" }}
          onClick={() => navigate("/coverletter")}
          isBlue
        />
      </div>

      <h1 className="text-3xl">
        {formData.title} at{" "}
        <span className="text-accentBlue">{formData.company}</span>
      </h1>

      <p className="mt-3">
        Simply edit if you'd like to make changes. If you're happy, you may
        download as a word document, or save it for later.
      </p>

      <div className="flex flex-wrap items-center max-w-3xl  mt-10">
        <div className="flex gap-2">
          <Button
            text="Download"
            onClick={() => downloadAsDOC(coverLetter, formData.company)}
            image={{ url: downloadSVG, alt: "download cover letter" }}
          />

          <Button
            onClick={() => saveCoverLetter.mutate()}
            text="Save"
            image={{ url: saveSVG, alt: "save cover letter" }}
          />

          <Button
            text={editMode ? "Save changes" : "Edit"}
            onClick={() => setEditMode(!editMode)}
            image={{ url: editSVG, alt: "edit cover letter" }}
          />
        </div>
      </div>

      <div
        className="relative mt-5 overflow-hidden"
        onMouseEnter={animateClickToCopy}
        onMouseLeave={animateClickToCopy}
        onClick={() => {
          if (!editMode) {
            copyToClipboard(coverLetter);
          }
        }}>
        {!editMode && (
          <>
            <div className="absolute h-[99%] z-10 w-full transition-all hover:cursor-pointer hover:bg-accentBlue/5" />

            <div
              ref={clickToCopyRef}
              className="absolute transition-all duration-300 top-0 right-[-100%] p-5">
              <Button
                text="Click to copy"
                image={{
                  url: clickToCopySVG,
                  alt: "click to copy cover letter",
                }}
                isBlue
              />
            </div>
          </>
        )}

        <ResizableTextArea
          editMode
          value={coverLetter}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setCoverLetter(e.target.value)
          }
          className={`text-sm overflow-scroll ${
            editMode ? "" : "hover:cursor-pointer"
          }`}
        />
      </div>
    </motion.div>
  );
}

export default CoverLetterReady;
