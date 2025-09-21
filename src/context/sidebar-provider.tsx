import { useEffect, useState } from "react";
import { DEFAULT_VALUE, SidebarContext } from "./sidebar-context";
import { useIsMobile } from "../hooks/use-is-mobile";

export const SidebarProvider: React.FC<{
  defaultValue?: Record<string, boolean>;
  children: React.ReactNode;
}> = ({ defaultValue = DEFAULT_VALUE, children }) => {
  const isMobile = useIsMobile();
  const [sidebarState, setSidebarState] =
    useState<Record<string, boolean>>(defaultValue);

  const toggleSidebar = (key: string) => {
    setSidebarState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    if (isMobile) {
      setSidebarState({
        leftSidebar: false,
        rightSidebar: false,
      });
    }
  }, [isMobile]);
  return (
    <SidebarContext.Provider value={{ state: sidebarState, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
