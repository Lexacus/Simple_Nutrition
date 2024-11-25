import { FC, ReactNode } from "react";
import { cn } from "../../utils";

type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "button";
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = "submit",
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        "btn btn-primary rounded-[8px] h-[2rem] min-h-[2rem]",
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
