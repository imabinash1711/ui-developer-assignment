import { useRef, useEffect } from "react";
import { useTheme } from "../hooks/use-theme";
import type { BreadcrumbItem } from "./breadcrumbs";
import Breadcrumbs from "./breadcrumbs";
import Input from "./input";
import { SvgIcon } from "./svg-icon";
import { useSidebar } from "../hooks/use-sidebar";
import { useBreadcrumb } from "../hooks/use-breadcrumb";
import { useIsMobile } from "../hooks/use-is-mobile";
import { usePopup } from "../hooks/use-popup";

const ICON_CLASS = "fill-light-black dark:fill-white m-1";
const SIZE = 28;
const Navbar = () => {
  const { toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const leftSidebar = useSidebar("leftSidebar");
  const rightSidebar = useSidebar("rightSidebar");
  const breadcrumbs: BreadcrumbItem[] = useBreadcrumb().state;
  const inputRef = useRef<HTMLInputElement>(null);
  const popup = usePopup();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCmdOrCtrl = event.metaKey || event.ctrlKey;

      if (isCmdOrCtrl && event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav className="border-b border-light-black/10 dark:border-white/10 h-navbar flex justify-between py-5 px-7 w-full">
      <div className="flex gap-2 items-center">
        <SvgIcon
          id="Sidebar"
          size={SIZE}
          className={ICON_CLASS}
          onClick={() => {
            if (isMobile && rightSidebar.isOpen) {
              rightSidebar.toggleSidebar();
            }
            leftSidebar.toggleSidebar();
          }}
        />
        <SvgIcon
          id="Star"
          size={SIZE}
          className={ICON_CLASS}
          onClick={() => popup.showPopup(<p>Clicked on Favourites</p>)}
        />
        {!isMobile && <Breadcrumbs items={breadcrumbs} />}
      </div>
      <div className="flex gap-2 items-center">
        <Input
          ref={inputRef}
          leftIcon="Search"
          rightIconText={isMobile ? undefined : "⌘/"}
          placeholder={isMobile ? undefined : "Search"}
          className="md:w-40 w-10"
          parentClassName="mr-3"
        />
        <SvgIcon
          id="Sun"
          size={SIZE}
          onClick={toggleTheme}
          className={ICON_CLASS}
        />
        <SvgIcon
          id="ClockCounterClockwise"
          size={SIZE}
          className={ICON_CLASS}
          onClick={() => popup.showPopup(<p>Clicked on History</p>)}
        />
        <SvgIcon
          id="Bell"
          size={SIZE}
          className={ICON_CLASS}
          onClick={() => popup.showPopup(<p>Clicked on Notifications</p>)}
        />
        <SvgIcon
          id="Sidebar"
          size={SIZE}
          className={ICON_CLASS}
          onClick={() => {
            if (isMobile && leftSidebar.isOpen) {
              leftSidebar.toggleSidebar();
            }
            rightSidebar.toggleSidebar();
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
