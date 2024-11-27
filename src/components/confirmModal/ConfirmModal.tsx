import { FC } from "react";
import { Modal } from "../ui/Modal";

type ConfirmModalProps = {
  onClose: () => void;
  customText?: string;
  confirmButtonText?: string;
  onConfirm?: () => void;
};

const ConfirmModal: FC<ConfirmModalProps> = ({
  onClose,
  customText,
  confirmButtonText,
  onConfirm,
}) => {
  return (
    <Modal onClose={onClose} hasOverlay={false} className="z-[1000]">
      <div className="flex flex-col gap-y-[15px]">
        <span className="w-full text-center">
          {customText ?? "Are you sure?"}
        </span>
        <div className="flex w-full justify-around">
          <button
            className="btn btn-primary min-h-0 max-h-[2rem]"
            onClick={onConfirm}
          >
            {confirmButtonText ?? "Confirm"}
          </button>
          <button
            className="btn btn-neutral-content min-h-0 max-h-[2rem]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
