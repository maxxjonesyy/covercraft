import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ResizableTextArea from "../components/ResizableTextArea";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import backArrowSVG from "../assets/icons/back-arrow.svg";
import clickToCopySVG from "../assets/icons/click-to-copy.svg";
import saveSVG from "../assets/icons/save.svg";

function CoverLetterReady() {
  const clickToCopyRef = useRef<HTMLDivElement>(null);
  const coverLetter = useLocation().state?.coverLetter;
  const formData = useLocation().state?.formData;
  const navigate = useNavigate();

  function animateClickToCopy() {
    if (clickToCopyRef.current) {
      clickToCopyRef.current.classList.toggle("right-[-50%]");
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

        <Button
          text="Save"
          image={{ url: saveSVG, alt: "save cover letter" }}
        />
      </div>

      <div
        className="relative mt-5 overflow-hidden"
        onMouseEnter={animateClickToCopy}
        onMouseLeave={animateClickToCopy}
        onClick={() => {
          navigator.clipboard.writeText(coverLetter);
          toast.success("Successfully copied!");
        }}>
        <div className="absolute h-[99%] z-10 w-full transition-all hover:cursor-pointer hover:bg-accentBlue/5" />

        <div
          ref={clickToCopyRef}
          className="absolute transition-all duration-300 top-0 right-[-50%] p-5">
          <Button
            text="Click to copy"
            image={{ url: clickToCopySVG, alt: "click to copy cover letter" }}
            isBlue
          />
        </div>

        <ResizableTextArea
          readOnly
          value={coverLetter}
          className="text-sm hover:cursor-pointer"
        />
      </div>
    </motion.div>
  );
}

export default CoverLetterReady;
