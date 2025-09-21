import { useState, type ReactNode } from "react";
import { PopupContext } from "./popup-context";
import Popup from "../components/popup";

export const PopupProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [className, setClassName] = useState("");

  const showPopup = (newContent: ReactNode) => setContent(newContent);
  const hidePopup = () => setContent(null);

  return (
    <PopupContext.Provider
      value={{
        content: content,
        showPopup: showPopup,
        hidePopup: hidePopup,
        className,
        setClassName,
      }}
    >
      {children}
      <Popup />
    </PopupContext.Provider>
  );
};
