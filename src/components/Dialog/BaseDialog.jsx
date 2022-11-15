import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

const BaseDialog = ({ isOpen, onClose, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.55,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="fixed inset-0 overflow-y-auto"
      >
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel
            className="w-full max-w-md transform overflow-hidden rounded-2xl
           bg-white p-6 text-left align-middle shadow-xl
            transition-all"
          >
            {children}
          </Dialog.Panel>
        </div>
      </motion.div>
    </Dialog>
  );
};

export default BaseDialog;
