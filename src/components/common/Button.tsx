import { FC, ReactNode } from "react";
import { cn } from "../../utils";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button: FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex justify-center items-center border bg-blue-600 text-white rounded-[8px] w-fit h-fit px-[10px] py-[3px] mx-auto",
        className
      )}
    >
      {children}
    </button>
  );
};
