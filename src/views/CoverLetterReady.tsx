import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ResizableTextArea, Button } from "../components/index";
import toast from "react-hot-toast";
import backArrowSVG from "../assets/icons/back-arrow.svg";
import clickToCopySVG from "../assets/icons/click-to-copy.svg";
import saveSVG from "../assets/icons/save.svg";

function CoverLetterReady() {
  const navigate = useNavigate();
  const location = useLocation();

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
      <h1 className="text-3xl">
        {formData.title} at {formData.company}
      </h1>
      <p className="mt-3">
        Click to copy or save to your collection - it's that simple!
      </p>

      <div className="flex items-center justify-between max-w-3xl  mt-10">
        <Button
          text="Back to form"
          image={{ url: backArrowSVG, alt: "back to form" }}
          onClick={() => navigate("/coverletter")}
          isBlue
        />

        <div className="flex gap-2">
          <Button
            text="Save"
            image={{ url: saveSVG, alt: "save cover letter" }}
          />

          <Button
            text={editMode ? "Done" : "Edit"}
            onClick={() => setEditMode(!editMode)}
          />
        </div>
      </div>

      <div
        className="relative mt-5 overflow-hidden"
        onMouseEnter={animateClickToCopy}
        onMouseLeave={animateClickToCopy}
        onClick={() => {
          if (!editMode) {
            navigator.clipboard.writeText(coverLetter);
            toast.success("Successfully copied!");
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
          className={`text-sm ${editMode ? "" : "hover:cursor-pointer"}`}
        />
      </div>
    </motion.div>
  );
}

export default CoverLetterReady;
