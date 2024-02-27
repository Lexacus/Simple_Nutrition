import { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="border bg-blue-600 text-white rounded-[8px] w-fit h-fit px-[10px] py-[3px] mx-auto"
    >
      {children}
    </button>
  );
};
