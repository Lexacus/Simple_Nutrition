import { FC } from "react";
import { Modal } from "../../../components/ui/Modal";
import { useTrackerStore } from "../../../store/TrackerStore";
import { Food } from "../../../types";
import FoodForm from "./FoodForm";

const EditFoodModal: FC<{ onClose: () => void; selectedIndex: number }> = ({
  onClose,
  selectedIndex,
}) => {
  const { selectedDate, days, editDay } = useTrackerStore(
    ({ selectedDate, days, editDay }) => ({
      selectedDate,
      days,
      editDay,
    })
  );

  const onFoodEdit = (food: Food) => {
    const newFoods = [...days[selectedDate].foods];
    newFoods.splice(selectedIndex, 1, food);
    editDay(selectedDate, {
      foods: newFoods,
    });
  };

  return (
    <Modal onClose={onClose}>
      <FoodForm
        onSubmit={onFoodEdit}
        defaultValues={days[selectedDate].foods[selectedIndex]}
      />
    </Modal>
  );
};

export default EditFoodModal;
