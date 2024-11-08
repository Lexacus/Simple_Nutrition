import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type SettingsStore = {
  darkTheme: boolean;
  toggleDarkTheme: () => void;
};

export const useSettingsStore = createWithEqualityFn<SettingsStore>()(
  persist(
    (set, get) => ({
      darkTheme: true,
      toggleDarkTheme: () => set({ darkTheme: !get().darkTheme }),
    }),
    { name: "auth-store" }
  ),
  shallow
);
