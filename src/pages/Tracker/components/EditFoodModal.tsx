import { FC } from "react";
import { Modal } from "@/components/ui/Modal";
import { useTrackerStore } from "@/store/TrackerStore";
import { Food } from "@/types";
import FoodForm from "./FoodForm";

const EditFoodModal: FC<{ onClose: () => void; selectedIndex: number }> = ({
  onClose,
  selectedIndex,
}) => {
  const { selectedDate, trackedDays, editTrackedDay } = useTrackerStore(
    ({ selectedDate, trackedDays, editTrackedDay }) => ({
      selectedDate,
      trackedDays,
      editTrackedDay,
    })
  );

  const onFoodEdit = (food: Food) => {
    const newFoods = [...trackedDays[selectedDate].foods];
    newFoods.splice(selectedIndex, 1, food);
    editTrackedDay(selectedDate, {
      foods: newFoods,
    });
  };

  const onDeleteFromDay = () => {
    const newFoods = trackedDays[selectedDate].foods.filter(
      (_, i) => i !== selectedIndex
    );
    editTrackedDay(selectedDate, {
      foods: [...newFoods],
    });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <FoodForm
        onSubmit={onFoodEdit}
        onDelete={onDeleteFromDay}
        defaultValues={trackedDays[selectedDate].foods[selectedIndex]}
      />
    </Modal>
  );
};

export default EditFoodModal;
