import { useState } from "react";
export type MenuItem = {
  label: string;
  onClick?: () => void;
};

const DropdownItem: React.FC<{
  item: MenuItem;
}> = ({ item }) => {
  return (
    <span className="group px-4 py-2 w-full text-left hover:bg-gray-200 hover:rounded-lg cursor-pointer">
      {item.label}
    </span>
  );
};

export const DropDownWrapper: React.FC<{
  children: React.ReactNode;
  options: MenuItem[];
  isSubMenu?: boolean;
}> = ({ children, options = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      {children}
      {open && (
        <div className="flex flex-col gap-2 absolute bg-gray-100 dark:bg-neutral-950 text-light-black dark:text-white w-40 rounded-lg">
          {options.map((option) => {
            return <DropdownItem item={option} />;
          })}
        </div>
      )}
    </div>
  );
};
