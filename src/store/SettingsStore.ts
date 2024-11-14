import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { Theme } from '@/types/theme';

type SettingsStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
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
      theme: 'lex' as Theme,
      setTheme: (theme) => set({ theme }),
      macroLimits: {
        maxCalories: 2000,
        maxCarbohydrates: 300,
        maxProteins: 150,
        maxFats: 70,
      },
      setMacroLimits: (macroLimits) => set({ macroLimits }),
    }),
    { name: "settings-store" }
  ),
  shallow
);
