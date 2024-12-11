import { motion } from "framer-motion";
import { FeaturedPriceCard, PriceCard } from "../components";
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
    <motion.div animate={{ y: 0, opacity: 1 }} initial={{ y: 300, opacity: 0 }}>
      <div className="container pb-[3rem] flex flex-col items-center">
        <img src={StripeBadge} alt="Stripe" className="h-8 w-auto mb-10" />
        <h1 className="text-3xl mb-2">Add Tokens</h1>

        <p className="text-gray-600">
          Use tokens to generate high-quality, tailored cover letters.
        </p>
      </div>

      <section className="flex flex-col md:flex-row justify-center gap-6 px-4 md:px-8 lg:px-12 py-10">
        <PriceCard
          tokenCount={5}
          price={5}
          pricePerToken={1}
          priceId="price_1QLfUtF40ixAgrNfyuMWGKUh"
        />

        <FeaturedPriceCard
          tokenCount={15}
          price={10}
          pricePerToken={0.67}
          bonusTokens={5}
          priceId="price_1QLfe2F40ixAgrNfx1zpyWKP"
        />

        <PriceCard
          tokenCount={25}
          price={15}
          pricePerToken={0.6}
          bonusTokens={10}
          priceId="price_1QLffZF40ixAgrNfYC0QcWZf"
        />
      </section>
    </motion.div>
  );
}

export default Token;
