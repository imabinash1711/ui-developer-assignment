import { useEffect, useMemo, useState } from "react";
import { useSidebar } from "../hooks/use-sidebar";
import { SvgIcon } from "./svg-icon";
import { useLocation, useNavigate } from "react-router-dom";

export interface SidebarOption {
  label: string;
  icon?: string;
  path?: string;
  subOptions?: SidebarOption[];
}

interface SidebarProps {
  name: string;
  icon: string;
  options: Record<string, SidebarOption[]>;
}

const SIDEBAR_CLASS =
  "transition-all duration-300 overflow-hidden h-screen border-r border-light-black/10 dark:border-white/10";
const ICON_CLASS = "fill-light-black dark:fill-white";
const SIZE = 20;

const SideBarItem: React.FC<{
  item: SidebarOption;
}> = ({ item }) => {
  const { isOpen } = useSidebar();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const isActive = useMemo(() => {
    if (item.path === "/") {
      return path === "/";
    }
    return item.path ? path.includes(item.path) : false;
  }, [path, item.path]);

  const isSubItemActive = useMemo(() => {
    return item.subOptions?.some(
      (subitem) => subitem.path && path.includes(subitem.path)
    );
  }, [item.subOptions, path]);

  useEffect(() => {
    if (isOpen && isSubItemActive) {
      setIsSubMenuOpen(true);
    }
    if (!isOpen) {
      setIsSubMenuOpen(false);
    }
  }, [isOpen, isSubItemActive]);

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex items-center gap-1 h-7 rounded-lg hover:bg-light-black/5 dark:hover:bg-white/10 cursor-pointer relative ${
          isActive || isSubItemActive ? "bg-light-black/5 dark:bg-white/10" : ""
        }`}
        onClick={() =>
          item.subOptions
            ? setIsSubMenuOpen((prev) => !prev)
            : navigate(item.path || "/")
        }
      >
        {isActive && (
          <div className="absolute inset-y-0 left-0 w-1 h-4 rounded-lg bg-light-black dark:bg-primary-brand self-center" />
        )}
        {item.subOptions ? (
          <div className="pl-2 py-0.5">
            <SvgIcon
              id="ArrowLineRight"
              size={16}
              className={`fill-light-black/20 dark:fill-white/20 transition-transform duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        ) : (
          <div className="w-6 h-5" />
        )}
        {item.icon ? (
          <SvgIcon id={item.icon} size={SIZE} className={ICON_CLASS} />
        ) : (
          <div className="w-5 h-5" />
        )}
        <span className="text-light-black dark:text-white whitespace-nowrap">
          {item.label}
        </span>
      </div>
      <div
        className="flex flex-col gap-1 overflow-hidden transition-all duration-200"
        style={{
          maxHeight: isOpen
            ? `${(item.subOptions?.length || 0) * 35}px`
            : "0px",
        }}
      >
        {isSubMenuOpen &&
          item.subOptions?.map((subItem, idx) => {
            return <SideBarItem key={`${item.label}-${idx}`} item={subItem} />;
          })}
      </div>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ name, icon, options }) => {
  const { isOpen } = useSidebar();

  return (
    <div
      className={`${SIDEBAR_CLASS} overflow-hidden ${
        isOpen ? "w-sidebar" : "w-0"
      }`}
    >
      <nav className="flex flex-col h-full gap-4 text-sm px-4 py-5 w-sidebar">
        <div className="flex items-center gap-2 m-1 w-full justify-start">
          <img src={icon} alt={name} className="w-6 h-6" />
          <span className="text-light-black dark:text-white whitespace-nowrap">
            {name}
          </span>
        </div>
        {Object.entries(options).map(([key, option]) => (
          <div key={key} className="flex flex-col gap-1 w-full">
            <p className="flex text-light-black/40 dark:text-white/40 mx-3 m-1 h-7 items-center whitespace-nowrap">
              {key}
            </p>
            {option.map((opt, idx) => {
              return <SideBarItem key={`${key}-${idx}`} item={opt} />;
            })}
          </div>
        ))}
      </nav>
    </div>
  );
};
