import { motion } from "framer-motion";
import { FeaturedPriceCard, PriceCard } from "../components";

function Token() {
  return (
    <motion.div animate={{ y: 0, opacity: 1 }} initial={{ y: 300, opacity: 0 }}>
      <div className="container">
        <h1 className="text-3xl mb-2">Add Tokens</h1>
      </div>

      <section className="flex justify-center flex-wrap gap-3">
        <PriceCard tokenCount={5} price={5} pricePerToken={1} paymentUrl="" />

        <FeaturedPriceCard
          tokenCount={15}
          price={10}
          pricePerToken={0.67}
          bonusTokens={5}
          paymentUrl=""
        />

        <PriceCard
          tokenCount={25}
          price={15}
          pricePerToken={0.6}
          bonusTokens={10}
          paymentUrl=""
        />
      </section>
    </motion.div>
  );
}

export default Token;
