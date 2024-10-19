import { Button } from "@/components/common/Button";
import { Modal } from "@/components/ui/Modal";
import { useFoodStore } from "@/store/FoodStore";
import { useTrackerStore } from "@/store/TrackerStore";
import { Food, Meals } from "@/types";
import dayjs from "dayjs";
import { FC, useMemo, useState } from "react";
import ReactSelect from "react-select";
import FoodForm from "./FoodForm";
import MealList from "./MealList";

type AddFoodModalProps = { onClose: () => void; selectedMeal?: Meals };

const SavedMealSelector = ({
  selectedMeal,
  onSubmit,
}: {
  selectedMeal: Meals;
  onSubmit?: () => void;
}) => {
  const { favoriteMeals, setFavoriteMeals } = useFoodStore(
    ({ favoriteMeals, setFavoriteMeals }) => ({
      favoriteMeals,
      setFavoriteMeals,
    })
  );

  const { selectedDate, trackedDays, editTrackedDay } = useTrackerStore(
    ({ selectedDate, trackedDays, editTrackedDay }) => ({
      selectedDate,
      trackedDays,
      editTrackedDay,
    })
  );

  const [selectedFavoriteMeal, setSelectedFavoriteMeal] = useState<string>();

  const favoriteMealOptions = favoriteMeals.map(({ name }) => {
    return { label: name, value: name };
  });

  const favoriteMealFoods = useMemo(() => {
    return (
      favoriteMeals.find(({ name }) => name === selectedFavoriteMeal)
        ?.mealFoods ?? []
    ).map((food, index) => {
      return { food, index };
    });
  }, [favoriteMeals, selectedFavoriteMeal]);

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
    onSubmit?.();
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
    <>
      <div className="flex flex-col gap-y-[5px] px-[20px] pt-[10px]">
        <ReactSelect
          options={favoriteMealOptions}
          onChange={(selectedOption) => {
            setSelectedFavoriteMeal(selectedOption?.value);
          }}
          placeholder="Select a favorite meal to load"
          isClearable
        />
        {selectedFavoriteMeal && (
          <MealList
            tabName={selectedMeal ?? "breakfast"}
            foods={favoriteMealFoods}
            isEditable={false}
          />
        )}
        <div className="flex flex-row">
          <Button
            onClick={handleLoadFromFavorites}
            disabled={!selectedFavoriteMeal}
          >
            Load selected
          </Button>
          <Button
            className="bg-red-600"
            onClick={handleDeleteFromFavorites}
            disabled={!selectedFavoriteMeal}
          >
            Delete selected
          </Button>
        </div>
      </div>
    </>
  );
};

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
    <Modal onClose={onClose} title="Add Foods" className="min-h-[675px]">
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
