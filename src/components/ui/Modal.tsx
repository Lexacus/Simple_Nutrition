import { FC, ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ModalOverlay } from "./ModalOverlay";
import { cn } from "../../utils";

interface ModalProps {
  onClose: () => void;
  className?: string;
  children?: ReactNode;
  hasOverlay?: boolean;
  title?: string;
}

export const Modal: FC<ModalProps> = ({
  onClose,
  className,
  children,
  hasOverlay = true,
  title,
}) => {
  return (
    <div
      className={cn(
        "flex absolute w-full h-full left-0 top-0 z-[100] items-center justify-center"
      )}
    >
      {hasOverlay && <ModalOverlay onClick={onClose} />}
      <div
        className={cn(
          "flex w-full max-w-[500px] h-fit flex-col gap-y-[10px] bg-white z-[110] rounded-[16px] mx-[10px] p-[10px]",
          className
        )}
      >
        <div className="flex justify-between mt-[5px]">
          <span className="font-semibold">{title}</span>
          <AiOutlineClose
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
