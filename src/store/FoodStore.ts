import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { Food } from "../types";

type FoodStore = {
  foods: Food[];
  setFoods: (foods: Food[]) => void;
  upsertFood: (food: Food) => void;
  deleteFood: (name: string) => void;
};

export const useFoodStore = createWithEqualityFn<FoodStore>()(
  persist(
    (set, get) => ({
      foods: [],
      setFoods: (foods) => set({ foods }),
      upsertFood: (food) => {
        const currentFoods = get().foods;
        const alreadyExistingFoodIndex = currentFoods.findIndex(
          ({ name }) => name === food.name
        );
        if (alreadyExistingFoodIndex === -1) {
          return set({ foods: [...currentFoods, food] });
        }
        currentFoods.splice(alreadyExistingFoodIndex, 1, food);
        return set({ foods: [...currentFoods] });
      },
      deleteFood: (name) => {
        const currentFoods = get().foods;
        const foodToDeleteIndex = currentFoods.findIndex(
          ({ name: foodName }) => name === foodName
        );
        if (foodToDeleteIndex !== -1) {
          currentFoods.splice(foodToDeleteIndex, 1);
        }
        return set({ foods: [...currentFoods] });
      },
    }),
    {
      name: "food-store",
    }
  ),
  shallow
);
