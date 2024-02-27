import { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export const Button: FC<ButtonProps> = ({ children }) => {
  return (
    <button className="border bg-blue-600 text-white rounded-[8px] w-fit h-fit px-[10px] py-[3px]">
      {children}
    </button>
  );
};
