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
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex justify-center items-center w-full max-w-[400px] min-w-[280px] px-4">
        <div className="w-full bg-white rounded-[20px]">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
