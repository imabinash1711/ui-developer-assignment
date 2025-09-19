import { useState } from "react";
import { SidebarContext } from "./sidebar-context";

export const SidebarProvider: React.FC<{
  defaultValue: boolean;
  children: React.ReactNode;
}> = ({ defaultValue = true, children }) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
