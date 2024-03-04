import { FC } from "react";
import { cn } from "../../utils";
import { AiOutlineCheck } from "react-icons/ai";

type CheckboxProps = {
  onChange?: () => void;
  checked: boolean;
  className?: string;
  label?: string;
};

export const Checkbox: FC<CheckboxProps> = ({ onChange, label, checked }) => {
  return (
    <div className="flex flex-row mx-auto items-center gap-x-[5px]">
      <div
        className={cn(
          "flex items-center justify-center w-6 h-6 border border-black rounded-full",
          checked && "bg-blue-600"
        )}
        onClick={onChange}
      >
        {checked && <AiOutlineCheck style={{ color: "white" }} />}
      </div>
      <span>{label}</span>
    </div>
  );
};
