import { createContext } from "react";
import type { BreadcrumbItem } from "../components/breadcrumbs";

export interface BreadcrumbContextType {
  state: BreadcrumbItem[];
  setBreadcrumb: (items: BreadcrumbItem[]) => void;
}

export const DEFAULT_VALUE: BreadcrumbItem[] = [
  { label: "Dashboards", href: "/" },
  { label: "Default", href: "/projects" },
];

export const BreadcrumbContext = createContext<
  BreadcrumbContextType | undefined
>(undefined);
