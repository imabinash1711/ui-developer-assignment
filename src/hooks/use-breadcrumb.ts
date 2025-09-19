import { useContext } from "react";
import {
  BreadcrumbContext,
  type BreadcrumbContextType,
} from "../context/breadcrumb-context";

export const useBreadcrumb = (): BreadcrumbContextType => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};
