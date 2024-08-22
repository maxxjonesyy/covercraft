import { useEffect, useRef } from "react";

function CustomTextArea(props: any) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textArea = textAreaRef.current;

    function resizeTextArea() {
      if (textArea) {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight}px`;
      }
    }

    textArea?.addEventListener("input", resizeTextArea);
    resizeTextArea();

    return () => {
      textArea?.removeEventListener("input", resizeTextArea);
    };
  }, []);

  return <textarea ref={textAreaRef} {...props} cols={50} rows={12} />;
}

export default CustomTextArea;