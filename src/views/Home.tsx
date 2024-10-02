import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      className="container">
      <h1>Home</h1>
    </motion.div>
  );
}

export default Home;
