import { createContext } from "react";

interface SidebarContextType {
  state: Record<string, boolean>;
  toggleSidebar: (key: string) => void;
}

export const DEFAULT_VALUE = {
  leftSidebar: true,
  rightSidebar: false,
};

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);
