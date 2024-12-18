import { motion } from "framer-motion";
import { PriceCards } from "../components";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import StripeBadge from "../assets/images/Powered by Stripe - black.svg";

function Token() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/events`
    );

    let isProcessing = false;

    eventSource.onmessage = (event) => {
      const { message, updatedTokens } = JSON.parse(event.data);

      if (message === "Processing payment..." && !isProcessing) {
        toast.loading(message);
        isProcessing = true;
      } else if (message === "Payment complete!") {
        if (updatedTokens > 0 && updatedTokens !== undefined) {
          setUser((prevState) => {
            if (!prevState) {
              return null;
            }

            return {
              ...prevState,
              tokenCount: updatedTokens,
            };
          });
        }
        toast.dismiss();
        toast.success(message);
        eventSource.close();
        isProcessing = false;
      } else if (message === "Payment failed") {
        toast.dismiss();
        toast.error(message);
        eventSource.close();
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      toast.error("An error occurred with the payment process.");
      eventSource.close();
    };

    return () => {
      toast.dismiss();
      eventSource.close();
    };
  }, []);

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      className="flex-grow">
      <div className="container pb-[6rem] flex flex-col items-center">
        <img src={StripeBadge} alt="Stripe" className="h-8 w-auto mb-10" />
        <h1 className="text-3xl mb-2">Add Tokens</h1>

        <p className="text-lg text-center text-gray-600">
          Use tokens to generate high-quality, tailored cover letters.
        </p>
      </div>

      <div className="pb-[6rem]">
        <PriceCards />
      </div>
    </motion.div>
  );
}

export default Token;
