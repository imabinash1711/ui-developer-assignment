import { createContext, type ReactNode } from "react";

export type PopupContextType = {
  content: ReactNode | null;
  className: string;
  setClassName: (str: string) => void;
  showPopup: (content: ReactNode) => void;
  hidePopup: () => void;
};

export const PopupContext = createContext<PopupContextType | undefined>(
  undefined
);
