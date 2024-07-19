import dayjs from "dayjs";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { DietDay, Food } from "../types";

type TrackerStore = {
  selectedDate: string;
  setSelectedDate: (selectedDate: string) => void;
  trackedDays: Record<string, DietDay>;
  setTrackedDays: (trackedDays: Record<string, DietDay>) => void;
  addTrackedDay: (date: string) => void;
  editTrackedDay: (date: string, day: DietDay) => void;
};

const today = dayjs().format("YYYY-MM-DD");

export const useTrackerStore = createWithEqualityFn<TrackerStore>()(
  persist(
    (set, get) => ({
      selectedDate: today,
      setSelectedDate: (selectedDate) => set({ selectedDate }),
      trackedDays: {},
      setTrackedDays: (trackedDays) => set({ trackedDays }),
      addTrackedDay: (date) =>
        set({ trackedDays: { ...get().trackedDays, [date]: { foods: [] } } }),
      editTrackedDay: (date, day) => {
        const newTrackedDays = get().trackedDays;
        newTrackedDays[date] = day;
        return set({ trackedDays: { ...newTrackedDays } });
      },
    }),
    {
      name: "tracker-store",
    }
  ),
  shallow
);
