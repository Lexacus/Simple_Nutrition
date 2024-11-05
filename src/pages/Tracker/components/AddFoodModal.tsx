import { Modal } from "@/components/ui/Modal";
import { useTrackerStore } from "@/store/TrackerStore";
import { Food, Meals } from "@/types";
import { FC, useState } from "react";
import FoodForm from "./FoodForm";
import { SavedMealSelector } from ".";

type AddFoodModalProps = { onClose: () => void; selectedMeal?: Meals };

const AddFoodModal: FC<AddFoodModalProps> = ({ onClose, selectedMeal }) => {
  const [activeTab, setActiveTab] = useState<number>(1);

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

  const handleTabChange = (tabNumber: number) => () => {
    setActiveTab(tabNumber);
  };

  return (
    <Modal onClose={onClose} title="Add Foods">
      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={activeTab === 1 ? "tab tab-active" : "tab"}
          onClick={handleTabChange(1)}
        >
          Single food
        </a>
        <a
          role="tab"
          className={activeTab === 2 ? "tab tab-active" : "tab"}
          onClick={handleTabChange(2)}
        >
          Favorite meal
        </a>
      </div>

      {activeTab === 1 && <FoodForm onSubmit={onFoodSaveToDay} />}
      {activeTab === 2 && (
        <SavedMealSelector
          selectedMeal={selectedMeal ?? "breakfast"}
          onSubmit={onClose}
        />
      )}
    </Modal>
  );
};

export default AddFoodModal;
