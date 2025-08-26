// components/Modal.tsx
import {  useEffect, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const ModalLayout: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Close modal with "Esc" key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed  flex inset-0 bg-black/50 items-center justify-center z-50"
      onClick={onClose} // click outside closes modal
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* modal content */}
      <div
        className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6 max-w-md w-full z-10"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
};
