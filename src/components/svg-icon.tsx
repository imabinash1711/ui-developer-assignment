interface SvgIconProps {
  id: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}
export function SvgIcon({
  id,
  size = 24,
  className,
  onClick,
  disabled,
}: SvgIconProps) {
  return (
    <svg
      id={id}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.4 : 1,
      }}
      className={`${
        onClick ? "cursor-pointer select-none" : ""
      } ${className} select-none`}
      aria-hidden="true"
      onClick={
        disabled
          ? undefined
          : (e: React.MouseEvent) => {
              e.stopPropagation();
              e.preventDefault();
              if (onClick) onClick();
            }
      }
    >
      <use href={`/assets/icons.svg#${id}`} />
    </svg>
  );
}
