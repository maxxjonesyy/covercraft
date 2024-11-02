import toast from "react-hot-toast";

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  toast.success("Successfully copied!");
}

export default copyToClipboard;
