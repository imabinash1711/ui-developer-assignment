interface SvgIconProps {
  id: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}
export function SvgIcon({ id, size = 24, className, onClick }: SvgIconProps) {
  return (
    <svg
      id={id}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`${onClick ? "cursor-pointer select-none" : ""} ${className}`}
      aria-hidden="true"
      onClick={onClick}
    >
      <use href={`/assets/icons.svg#${id}`} />
    </svg>
  );
}
