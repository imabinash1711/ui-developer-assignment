import { useState } from "react";
import { DEFAULT_VALUE, SidebarContext } from "./sidebar-context";

export const SidebarProvider: React.FC<{
  defaultValue?: Record<string, boolean>;
  children: React.ReactNode;
}> = ({ defaultValue = DEFAULT_VALUE, children }) => {
  const [sidebarState, setSidebarState] =
    useState<Record<string, boolean>>(defaultValue);

  const toggleSidebar = (key: string) =>
    setSidebarState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

  return (
    <SidebarContext.Provider value={{ state: sidebarState, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
