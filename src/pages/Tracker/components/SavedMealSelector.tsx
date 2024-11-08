import ReactSelect from "react-select";
import MealList from "./MealList";
import { Meals } from "@/types";
import { useFoodStore } from "@/store/FoodStore";
import { useTrackerStore } from "@/store/TrackerStore";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@/components/common/Button";

export const SavedMealSelector = ({
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
            tabName={selectedMeal}
            mealName={selectedMeal ?? "breakfast"}
            foods={favoriteMealFoods}
            isEditable={false}
          />
        )}
        <div className="flex justify-around w-full">
          <button
            className="btn btn-primary"
            onClick={handleLoadFromFavorites}
            disabled={!selectedFavoriteMeal}
          >
            Load selected
          </button>
          <button
            className="btn btn-error"
            onClick={handleDeleteFromFavorites}
            disabled={!selectedFavoriteMeal}
          >
            Delete selected
          </button>
        </div>
      </div>
    </>
  );
};
