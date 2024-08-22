import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ResizableTextArea from "../components/ResizableTextArea";
import toast from "react-hot-toast";

import backArrowSVG from "../assets/icons/back-arrow.svg";
import clickToCopySVG from "../assets/icons/click-to-copy.svg";

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
    <div className="container">
      <h1 className="text-3xl mb-2">Your cover letter is ready!</h1>
      <p>
        Click to copy your cover letter for {""}
        <b>
          {formData?.title} at {formData?.company}
        </b>
      </p>

      <button
        className="flex items-center justify-center gap-3 text-sm mt-10 bg-accentBlue text-white px-4 py-2 rounded shadow transition-all hover:scale-105"
        onClick={() => navigate("/coverletter")}>
        <img src={backArrowSVG} alt="back to form" />
        Back to form
      </button>

      <div
        className="relative mt-5 overflow-hidden"
        onMouseEnter={animateClickToCopy}
        onMouseLeave={animateClickToCopy}
        onClick={() => {
          navigator.clipboard.writeText(coverLetter);
          toast.success("Cover letter copied to clipboard");
        }}>
        <div className="absolute h-[99%] z-10 w-full transition-all hover:cursor-pointer hover:bg-accentBlue/5" />

        <div
          ref={clickToCopyRef}
          className="absolute transition-all duration-300 top-0 right-[-50%] p-5">
          <button className="flex items-center gap-3 px-5 py-2 text-white bg-accentBlue rounded">
            <span className="text-sm">Click to copy</span>
            <img src={clickToCopySVG} alt="click to copy cover letter" />
          </button>
        </div>

        <ResizableTextArea
          readOnly
          value={coverLetter}
          className="text-sm hover:cursor-pointer"
        />
      </div>
    </div>
  );
}

export default CoverLetterReady;
