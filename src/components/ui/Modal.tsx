import { FC, ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ModalOverlay } from "./ModalOverlay";
import { cn } from "../../utils";

interface ModalProps {
  className?: string;
  children: ReactNode;
  onClose: () => void;
  hasOverlay?: boolean;
}

export const Modal: FC<ModalProps> = ({
  children,
  onClose,
  hasOverlay = true,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex absolute w-full h-full left-0 top-0 z-[100] items-center",
        className
      )}
    >
      {hasOverlay && <ModalOverlay onClick={onClose} />}
      <div className="flex w-full h-fit flex-col gap-y-[10px] bg-white z-[110] rounded-[16px] mx-[10px] p-[10px]">
        <div className="flex justify-end pr-[20px]">
          <AiOutlineClose style={{ fontSize: "25px" }} onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
};
