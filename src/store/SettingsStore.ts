import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type SettingsStore = {
  darkTheme: boolean;
  toggleDarkTheme: () => void;
  macroLimits: {
    maxCalories: number;
    maxCarbohydrates: number;
    maxProteins: number;
    maxFats: number;
  };
  setMacroLimits: (macroLimits: {
    maxCalories: number;
    maxCarbohydrates: number;
    maxProteins: number;
    maxFats: number;
  }) => void;
};

export const useSettingsStore = createWithEqualityFn<SettingsStore>()(
  persist(
    (set, get) => ({
      darkTheme: true,
      toggleDarkTheme: () => set({ darkTheme: !get().darkTheme }),
      macroLimits: {
        maxCalories: 2000,
        maxCarbohydrates: 300,
        maxProteins: 150,
        maxFats: 70,
      },
      setMacroLimits: (macroLimits) => set({ macroLimits }),
    }),
    { name: "auth-store" }
  ),
  shallow
);
