import type { ReactNode, MouseEventHandler } from "react";

export interface AppButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function AppButton({
  children,     // button label or content
  onClick,      // click event handler required
  className,   // optional CSS class for styling
  disabled = false, // button disabled state, supports disable, by default false
  type = "button",
}: AppButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className ?? "btn-primary"}`}
    >
      {children}
    </button>
  );
}
