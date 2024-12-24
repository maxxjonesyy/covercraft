import { motion } from "framer-motion";
import { PriceCards } from "../components";
import { stripeBadge } from "../assets/index";

function Token() {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      className="flex-grow">
      <div className="container pb-[6rem] flex flex-col items-center">
        <img src={stripeBadge} alt="Stripe" className="h-8 w-auto mb-10" />
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
