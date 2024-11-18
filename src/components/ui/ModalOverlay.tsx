import { FC } from "react";

type ModalOverlayProps = {
  onClick?: () => void;
};

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClick }) => {
  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm"
      onClick={onClick}
    />
  );
};
