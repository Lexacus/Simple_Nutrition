import { persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { Food } from "../types";
import { shallow } from "zustand/shallow";

type DietPlanWeek = Food[][];
/*   tuesday: Food[];
  wednesday: Food[];
  thursday: Food[];
  friday: Food[];
  saturday: Food[];
  sunday: Food[]; */

type DietPlanStore = {
  dietPlan: DietPlanWeek;
  setDietPlan: (dietPlan: DietPlanWeek) => void;
  addFoodToDay: (dayNumber: number, food: Food) => void;
  editDay: (dayNumber: number, food: Food, index: number) => void;
  removeFoodFromDay: (dayNumber: number, index: number) => void;
};

export const useDietPlanStore = createWithEqualityFn<DietPlanStore>()(
  persist(
    (set, get) => ({
      dietPlan: [[], [], [], [], [], [], []],
      setDietPlan: (dietPlan) => set({ dietPlan }),
      addFoodToDay: (dayNumber, food) => {
        const dietPlanCopy = [...get().dietPlan];
        dietPlanCopy.splice(dayNumber, 1, [...dietPlanCopy[dayNumber], food]);
        return set({ dietPlan: dietPlanCopy });
      },
      editDay: (dayNumber, food, index) => {
        const dietPlanCopy = [...get().dietPlan];
        const dayToChangeCopy = [...dietPlanCopy[dayNumber]];
        dayToChangeCopy.splice(index, 1, food);
        dietPlanCopy.splice(dayNumber, 1, dayToChangeCopy);
        return set({ dietPlan: dietPlanCopy });
      },
      removeFoodFromDay: (dayNumber, index) => {
        const dietPlanCopy = [...get().dietPlan];
        const dayToChangeCopy = [...dietPlanCopy[dayNumber]];
        dayToChangeCopy.splice(index, 1);
        dietPlanCopy.splice(dayNumber, 1, dayToChangeCopy);
        return set({ dietPlan: dietPlanCopy });
      },
    }),
    {
      name: "diet-plan-store",
    }
  ),
  shallow
);
