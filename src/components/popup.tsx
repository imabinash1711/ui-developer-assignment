// Popup.tsx
import React, { useEffect } from "react";
import { usePopup } from "../hooks/use-popup";

const Popup: React.FC = () => {
  const { content, hidePopup, className } = usePopup();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") hidePopup();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hidePopup]);

  if (!content) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={hidePopup}
    >
      <div
        className={`bg-gray-100 dark:bg-neutral-950 text-light-black dark:text-white p-6 rounded-2xl shadow-xl max-w-md w-full transition transform duration-200 scale-100 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>
  );
};

export default Popup;
