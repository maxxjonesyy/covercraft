import { motion } from "framer-motion";

function Profile() {
  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 300, opacity: 0 }}
      className="container">
      <h1>Profile</h1>
    </motion.div>
  );
}

export default Profile;
