import { FC } from "react";
import { Modal } from "../../../components/ui/Modal";
import { useTrackerStore } from "../../../store/TrackerStore";
import { Food, Meals } from "../../../types";
import FoodForm from "./FoodForm";

const AddFoodModal: FC<{ onClose: () => void; selectedMeal?: Meals }> = ({
  onClose,
  selectedMeal,
}) => {
  const { selectedDate, days, editDay } = useTrackerStore(
    ({ selectedDate, days, editDay }) => ({
      selectedDate,
      days,
      editDay,
    })
  );

  const onFoodSaveToDay = (foodItem: Food) => {
    editDay(selectedDate, {
      foods: [
        ...days[selectedDate].foods,
        { ...foodItem, meal: selectedMeal ?? "breakfast" },
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
