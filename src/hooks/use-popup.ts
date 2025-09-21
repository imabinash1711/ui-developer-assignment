import { useContext } from "react";
import { PopupContext } from "../context/popup-context";

export function usePopup() {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error("usePopup must be used within PopupProvider");
  return ctx;
}
