// components/Breadcrumbs.tsx

import { Link } from "react-router-dom";
import { SvgIcon } from "./svg-icon";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

const ICON_CLASS = "fill-light-black dark:fill-white m-1";
const SIZE = 24;

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = "/",
}) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-sm text-light-black/20 dark:text-white/20">
                  {separator}
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="px-2 py-1 text-sm text-light-black/40 dark:text-white/40"
                >
                  {item.icon && (
                    <SvgIcon
                      id={item.icon}
                      size={SIZE}
                      className={ICON_CLASS}
                    />
                  )}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className="px-2 py-1 text-sm text-light-black dark:text-white">
                  {item.icon && (
                    <SvgIcon
                      id={item.icon}
                      size={SIZE}
                      className={ICON_CLASS}
                    />
                  )}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
