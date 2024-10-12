import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Modal } from "@/components/ui/Modal";
import { useFoodStore } from "@/store/FoodStore";
import { useTrackerStore } from "@/store/TrackerStore";
import { Food, Meals } from "@/types";
import dayjs from "dayjs";
import { useState } from "react";
import ReactSelect from "react-select";

const today = dayjs().format("YYYY-MM-DD");

const FavoriteMealModal = ({
  onClose,
  foods,
  selectedMeal,
}: {
  onClose: () => void;
  selectedMeal?: Meals;
  foods?: { food: Food; index: number }[];
}) => {
  const { favoriteMeals, upsertFavoriteMeal, setFavoriteMeals } = useFoodStore(
    ({ favoriteMeals, upsertFavoriteMeal, setFavoriteMeals }) => ({
      favoriteMeals,
      upsertFavoriteMeal,
      setFavoriteMeals,
    })
  );

  const { trackedDays, editTrackedDay, selectedDate } = useTrackerStore(
    ({ trackedDays, editTrackedDay, selectedDate }) => ({
      trackedDays,
      editTrackedDay,
      selectedDate,
    })
  );

  const [mealName, setMealName] = useState<string>("");
  const [selectedFavoriteMeal, setSelectedFavoriteMeal] = useState<string>();

  return (
    <Modal onClose={onClose}>
      <div>
        <Input
          value={mealName}
          onChange={(e) => {
            setMealName(e.currentTarget.value);
          }}
        />
        <Button
          onClick={() => {
            if (!mealName) {
              return;
            }
            upsertFavoriteMeal({
              mealFoods: foods?.map(({ food }) => food) ?? [],
              name: mealName,
            });
          }}
        >
          Save meal as favorite
        </Button>
        <ReactSelect
          options={favoriteMeals.map(({ name }) => {
            return { label: name, value: name };
          })}
          onChange={(selectedOption) => {
            setSelectedFavoriteMeal(selectedOption?.value);
          }}
          value={{ label: selectedFavoriteMeal, value: selectedFavoriteMeal }}
        />

        <Button
          onClick={() => {
            const foodsToCopy = favoriteMeals
              .find(({ name }) => name === selectedFavoriteMeal)
              ?.mealFoods.map((food) => {
                return { ...food, meal: selectedMeal };
              });

            const filteredToday = trackedDays[today].foods.filter(
              ({ meal }) => meal !== selectedMeal
            );

            editTrackedDay(dayjs(selectedDate).format("YYYY-MM-DD"), {
              foods: [...filteredToday, ...(foodsToCopy ?? [])],
            });
          }}
        >
          Load from favorite meals
        </Button>
        <Button
          onClick={() => {
            if (!selectedFavoriteMeal) {
              return;
            }
            const newFavoriteMeals = favoriteMeals.filter(
              ({ name }) => name !== selectedFavoriteMeal
            );
            setFavoriteMeals(newFavoriteMeals);
          }}
        >
          Delete from favorite meals
        </Button>
      </div>
    </Modal>
  );
};

export default FavoriteMealModal;
