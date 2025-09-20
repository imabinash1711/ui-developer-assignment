import { useEffect, useRef } from "react";
import { SvgIcon } from "./svg-icon";

type CheckboxProps = {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  indeterminate = false,
  className,
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label className="flex gap-2 items-center">
      <SvgIcon
        id={checked ? "Checked" : "Checkbox"}
        size={16}
        onClick={() => onChange(!checked)}
        disabled={disabled}
        className={`${className} ${
          checked
            ? "fill-light-brand dark:fill-primary-brand"
            : "fill-light-black/20 dark:fill-white/20"
        }`}
      />
      {label && <span>{label}</span>}
    </label>
  );
};

export default Checkbox;
