import { useContext } from "react";
import { DEFAULT_VALUE, SidebarContext } from "../context/sidebar-context";

interface SidebarContextReturnType {
  isOpen: boolean;
  toggleSidebar: () => void;
}
export const useSidebar = (
  key: keyof typeof DEFAULT_VALUE
): SidebarContextReturnType => {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within a SidebarProvider");

  return {
    isOpen: context.state[key],
    toggleSidebar: () => context.toggleSidebar(key),
  };
};
