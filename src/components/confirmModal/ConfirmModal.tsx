import { FC } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../common/Button";

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
    <Modal onClose={onClose} className="z-[1000]">
      <div className="flex flex-col gap-y-[15px]">
        <span className="w-full text-center">
          {customText ?? "Are you sure?"}
        </span>
        <div className="flex">
          <Button onClick={onConfirm}>{confirmButtonText ?? "Confirm"}</Button>
          <Button
            className="bg-white text-blue-600 border-blue-600 font-semibold"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
