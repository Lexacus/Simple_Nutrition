import { FC } from "react";
import { Meals } from "../types";

type ManageFoodModalProps = {
  onClose: () => void;
  selectedMeal: Meals;
};

export const ManageFoodModal: FC<ManageFoodModalProps> = ({
  onClose,
  selectedMeal,
}) => {
  return (
    <div className="absolute w-full h-full bg-red-800">
      <div className="flex w-full h-full flex-col">
        <button onClick={onClose}>Chiudi</button>
      </div>
    </div>
  );
};
