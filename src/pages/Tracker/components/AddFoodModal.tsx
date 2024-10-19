import { Button } from "@/components/common/Button";
import { Modal } from "@/components/ui/Modal";
import { useFoodStore } from "@/store/FoodStore";
import { useTrackerStore } from "@/store/TrackerStore";
import { Food, Meals } from "@/types";
import dayjs from "dayjs";
import { FC, useState } from "react";
import ReactSelect from "react-select";
import FoodForm from "./FoodForm";

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

  const { favoriteMeals, setFavoriteMeals } = useFoodStore(
    ({ favoriteMeals, setFavoriteMeals }) => ({
      favoriteMeals,
      setFavoriteMeals,
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

  const [selectedFavoriteMeal, setSelectedFavoriteMeal] = useState<string>();

  const favoriteMealOptions = favoriteMeals.map(({ name }) => {
    return { label: name, value: name };
  });

  const handleLoadFromFavorites = () => {
    const foodsToCopy = favoriteMeals
      .find(({ name }) => name === selectedFavoriteMeal)
      ?.mealFoods.map((food) => {
        return { ...food, meal: selectedMeal };
      });

    const filteredToday = trackedDays[selectedDate].foods.filter(
      ({ meal }) => meal !== selectedMeal
    );

    editTrackedDay(dayjs(selectedDate).format("YYYY-MM-DD"), {
      foods: [...filteredToday, ...(foodsToCopy ?? [])],
    });
    onClose();
  };

  const handleDeleteFromFavorites = () => {
    if (!selectedFavoriteMeal) {
      return;
    }
    const newFavoriteMeals = favoriteMeals.filter(
      ({ name }) => name !== selectedFavoriteMeal
    );
    setFavoriteMeals(newFavoriteMeals);
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
        <div className="flex flex-col gap-y-[5px]">
          <ReactSelect
            options={favoriteMealOptions}
            onChange={(selectedOption) => {
              setSelectedFavoriteMeal(selectedOption?.value);
            }}
            placeholder="Select a favorite meal to load"
            isClearable
          />
          <div className="flex flex-row">
            <Button
              onClick={handleLoadFromFavorites}
              disabled={!selectedFavoriteMeal}
            >
              Load from favorite meals
            </Button>
            <Button
              className="bg-red-600"
              onClick={handleDeleteFromFavorites}
              disabled={!selectedFavoriteMeal}
            >
              Delete from favorite meals
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AddFoodModal;
