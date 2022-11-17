import { motion } from "framer-motion";
import React from "react";
export default function ListCard({ children, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className="bg-gray-100 shadow-lg flex justify-around card-gradient rounded-lg h-20 px-8 items-center"
    >
      {children}
    </motion.div>
  );
}
