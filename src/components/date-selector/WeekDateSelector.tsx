import { FC } from "react";
import { DateSelector } from "./DateSelector";
import dayjs from "dayjs";
import { useTrackerStore } from "../../store/TrackerStore";

export const WeekDateSelector: FC = () => {
  const { selectedDate, setSelectedDate } = useTrackerStore(
    ({ selectedDate, setSelectedDate }) => ({
      selectedDate,
      setSelectedDate,
    })
  );
  const selectedDay = dayjs(selectedDate).day();

  const previousDate = () => {
    setSelectedDate(
      dayjs(selectedDate).subtract(1, "day").format("YYYY-MM-DD")
    );
  };

  const nextDate = () => {
    setSelectedDate(dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD"));
  };
  return (
    <DateSelector
      selectedDate={selectedDate}
      onLeftArrowClick={previousDate}
      onRightArrowClick={nextDate}
      previousDateDisabled={selectedDay === 1}
      nextDateDisabled={selectedDay === 0}
    />
  );
};
