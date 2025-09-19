// components/InputWithIcons.tsx

import { useRef } from "react";
import { SvgIcon } from "./svg-icon";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: string;
  rightIcon?: string;
  leftIconText?: string;
  rightIconText?: string;
  className?: string;
  parentClassName?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const ICON_CLASS = "fill-light-black dark:fill-white";
const SIZE = 16;
const LEFT_ICON_CLASS =
  "absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none";
const RIGHT_ICON_CLASS =
  "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none";

const Input: React.FC<InputProps> = ({
  ref,
  leftIcon,
  rightIcon,
  leftIconText,
  rightIconText,
  placeholder,
  className = "w-full",
  parentClassName = "",
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={`relative ${parentClassName}`}>
      {leftIconText && (
        <span
          className={`text-light-black/20 dark:text-white/20 ${LEFT_ICON_CLASS}`}
        >
          {leftIconText}
        </span>
      )}
      {leftIcon && (
        <div className={LEFT_ICON_CLASS}>
          <SvgIcon id={leftIcon} size={SIZE} className={ICON_CLASS} />
        </div>
      )}

      <input
        {...props}
        ref={ref || inputRef}
        placeholder={placeholder}
        className={`bg-light-black/5 dark:bg-white/10 py-1 rounded-lg 
            text-light-black/50  dark:text-white/50
            placeholder:text-light-black/20  dark:placeholder:text-white/20 
            caret-light-black/20 dark:caret-white/20 h-7
            text-sm focus:outline-none focus:ring-1 focus:ring-light-black/20 dark:focus:ring-white/20 
            ${className}
            ${leftIcon ? "pl-7" : "pl-2"} 
            ${rightIcon ? "pr-7" : "pr-2"} 
        `}
      />
      {rightIconText && (
        <span
          className={`text-light-black/20 dark:text-white/20 ${RIGHT_ICON_CLASS}`}
        >
          {rightIconText}
        </span>
      )}
      {rightIcon && (
        <div className={RIGHT_ICON_CLASS}>
          <SvgIcon id={rightIcon} size={SIZE} className={ICON_CLASS} />
        </div>
      )}
    </div>
  );
};

export default Input;
