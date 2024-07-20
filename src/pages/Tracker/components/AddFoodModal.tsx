import { FC } from "react";
import { Modal } from "../../../components/ui/Modal";
import { useTrackerStore } from "../../../store/TrackerStore";
import { Food, Meals } from "../../../types";
import FoodForm from "./FoodForm";

const AddFoodModal: FC<{ onClose: () => void; selectedMeal?: Meals }> = ({
  onClose,
  selectedMeal,
}) => {
  const { selectedDate, trackedDays, editTrackedDay } = useTrackerStore(
    ({ selectedDate, trackedDays, editTrackedDay }) => ({
      selectedDate,
      trackedDays,
      editTrackedDay,
    })
  );

  const onFoodSaveToDay = (food: Food) => {
    editTrackedDay(selectedDate, {
      foods: [
        ...trackedDays[selectedDate].foods,
        { ...food, meal: selectedMeal ?? "breakfast" },
      ],
    });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <FoodForm onSubmit={onFoodSaveToDay} />
    </Modal>
  );
};

export default AddFoodModal;
