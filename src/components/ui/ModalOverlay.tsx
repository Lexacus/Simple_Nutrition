import { FC } from "react";

type ModalOverlayProps = {
  onClick?: () => void;
};

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClick }) => {
  return (
    <div
      className="absolute w-full h-[100vh] bg-[#00000070]"
      onClick={onClick}
    />
  );
};
