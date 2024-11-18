import { useFoodStore } from "@/store/FoodStore";
import { useTrackerStore } from "@/store/TrackerStore";
import { Meals } from "@/types";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import MealList from "./MealList";

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
    <div className="flex flex-col gap-4">
      <select 
        className="select select-bordered w-full"
        onChange={(e) => {
          setSelectedFavoriteMeal(e.target.value);
        }}
        value={selectedFavoriteMeal || ""}
      >
        <option value="" disabled>Select a favorite meal to load</option>
        {favoriteMealOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {selectedFavoriteMeal && (
        <MealList
          tabName={selectedMeal}
          mealName={selectedMeal}
          foods={favoriteMealFoods}
          isEditable={false}
        />
      )}

      <div className="flex gap-2">
        <button
          className="btn flex-1"
          onClick={handleLoadFromFavorites}
          disabled={!selectedFavoriteMeal}
        >
          Load selected
        </button>
        <button
          className="btn btn-error flex-1"
          onClick={handleDeleteFromFavorites}
          disabled={!selectedFavoriteMeal}
        >
          Delete selected
        </button>
      </div>
    </div>
  );
};
