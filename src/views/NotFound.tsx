import { motion } from "framer-motion";

function NotFound() {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      className="container flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-3">404 - Page not found</h1>
      <p>Sorry, the page you're looking for does not exist</p>
    </motion.div>
  );
}

export default NotFound;
