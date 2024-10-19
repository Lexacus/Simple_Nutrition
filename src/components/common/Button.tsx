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
        "flex justify-center items-center border bg-blue-600 text-white rounded-[8px] w-fit h-fit px-[10px] py-[3px] mx-auto",
        disabled ? "opacity-80" : "",
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
