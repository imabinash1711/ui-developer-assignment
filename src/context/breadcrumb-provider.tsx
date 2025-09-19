import { useEffect, useState } from "react";
import type { BreadcrumbItem } from "../components/breadcrumbs";
import { BreadcrumbContext, DEFAULT_VALUE } from "./breadcrumb-context";
import { useLocation } from "react-router-dom";

export const BreadcrumbProvider: React.FC<{
  defaultValue?: BreadcrumbItem[];
  children: React.ReactNode;
}> = ({ defaultValue = DEFAULT_VALUE, children }) => {
  const path = useLocation().pathname;
  const [breadcrumbState, setBreadcrumbState] =
    useState<BreadcrumbItem[]>(defaultValue);

  const setBreadcrumbFromUrl = (url: string) => {
    const pathParts = url.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = pathParts.map((part, index) => ({
      label: part.charAt(0).toUpperCase() + part.slice(1),
      href: `/${pathParts.slice(0, index + 1).join("/")}`,
    }));
    setBreadcrumbState(url === "/" ? DEFAULT_VALUE : breadcrumbs);
  };

  useEffect(() => {
    setBreadcrumbFromUrl(path);
  }, [path]);

  const contextValue = {
    state: breadcrumbState,
    setBreadcrumb: setBreadcrumbState,
  };

  return (
    <BreadcrumbContext.Provider value={contextValue}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
