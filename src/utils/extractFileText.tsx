import pdfToText from "react-pdftotext";
import toast from "react-hot-toast";

async function extractFileText(file: File | undefined) {
  if (!file) {
    toast.error("No file selected");
    return;
  }

  try {
    const content = await pdfToText(file);

    if (content) {
      return content;
    }
  } catch (error) {
    toast.error("Error converting PDF to text");
  }
}

export default extractFileText;
