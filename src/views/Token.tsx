import { motion } from "framer-motion";

function Token() {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      className="container">
      <h1>Token</h1>
    </motion.div>
  );
}

export default Token;
