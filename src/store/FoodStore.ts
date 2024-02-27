import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { Food } from "../types";

type FoodStore = {
  foods: Food[];
  addFood: (food: Food) => void;
};

export const useFoodStore = createWithEqualityFn<FoodStore>()(
  persist(
    (set, get) => ({
      foods: [],
      addFood: (food) => set({ foods: [...get().foods, food] }),
    }),
    {
      name: "food-store",
    }
  ),
  shallow
);
