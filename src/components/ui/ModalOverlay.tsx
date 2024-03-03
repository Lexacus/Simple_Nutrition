import { FC } from "react";

type ModalOverlayProps = {
  onClick?: () => void;
};

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClick }) => {
  return (
    <div className="absolute w-full h-full bg-[#00000050]" onClick={onClick} />
  );
};
