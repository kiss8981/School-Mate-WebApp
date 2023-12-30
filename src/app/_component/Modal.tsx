import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const Modal = ({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) {
    return null;
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      <div
        className="fixed top-/ left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex justify-center items-center w-full max-w-[400px] min-w-[280px] px-4"
        style={{
          top: "calc(20px + 50%)",
        }}
      >
        <motion.div
          className="w-full bg-white rounded-[20px]"
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              ease: "easeOut",
              duration: 0.15,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.75,
            transition: {
              ease: "easeIn",
              duration: 0.15,
            },
          }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
};

export default Modal;
