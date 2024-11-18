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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {hasOverlay && <ModalOverlay onClick={onClose} />}
      <div
        className={cn(
          "relative w-full max-w-[500px] max-h-[90vh] bg-base-100 rounded-lg shadow-xl mx-4 border border-base-content/10",
          className
        )}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 bg-base-100 border-b border-base-content/10">
          <span className="font-semibold text-base-content">{title}</span>
          <button 
            className="btn btn-ghost btn-sm btn-square"
            onClick={onClose}
          >
            <AiOutlineClose className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
