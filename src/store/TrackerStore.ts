import dayjs from "dayjs";
import { DietDay } from "../types";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type TrackerStore = {
  selectedDate: string;
  setSelectedDate: (selectedDate: string) => void;
  days: Record<string, DietDay>;
  setDays: (days: Record<string, DietDay>) => void;
  addDay: (date: string) => void;
  editDay: (date: string, day: DietDay) => void;
};

const today = dayjs().format("YYYY-MM-DD");

export const useTrackerStore = createWithEqualityFn<TrackerStore>()(
  persist(
    (set, get) => ({
      selectedDate: today,
      setSelectedDate: (selectedDate) => set({ selectedDate }),
      days: {},
      setDays: (days) => set({ days }),
      addDay: (date) => set({ days: { ...get().days, [date]: { foods: [] } } }),
      editDay: (date, day) => {
        const newDays = get().days;
        newDays[date] = day;
        return set({ days: { ...newDays } });
      },
    }),
    {
      name: "tracker-store", // name of the item in the storage (must be unique)
    }
  ),
  shallow
);
