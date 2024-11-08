import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type SettingsStore = {
  darkTheme: boolean;
  toggleDarkTheme: () => void;
  maxCalories: number;
  maxCarbohydrates: number;
  maxProteins: number;
  maxFats: number;
  setMaxCalories: (maxCalories: number) => void;
  setMaxCarbohydrates: (maxCarbohydrates: number) => void;
  setMaxProteins: (maxProteins: number) => void;
  setMaxFats: (maxFats: number) => void;
};

export const useSettingsStore = createWithEqualityFn<SettingsStore>()(
  persist(
    (set, get) => ({
      darkTheme: true,
      toggleDarkTheme: () => set({ darkTheme: !get().darkTheme }),
      maxCalories: 2000,
      maxCarbohydrates: 300,
      maxProteins: 150,
      maxFats: 70,
      setMaxCalories: (maxCalories) => set({ maxCalories }),
      setMaxCarbohydrates: (maxCarbohydrates) => set({ maxCarbohydrates }),
      setMaxProteins: (maxProteins) => set({ maxProteins }),
      setMaxFats: (maxFats) => set({ maxFats }),
    }),
    { name: "auth-store" }
  ),
  shallow
);
