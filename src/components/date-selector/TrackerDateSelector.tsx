import { FC } from "react";
import { DateSelector } from "./DateSelector";
import dayjs from "dayjs";
import { useTrackerStore } from "../../store/TrackerStore";

const today = dayjs().format("YYYY-MM-DD");

export const TrackerDateSelector: FC = () => {
  const { selectedDate, setSelectedDate } = useTrackerStore(
    ({ selectedDate, setSelectedDate }) => ({
      selectedDate,
      setSelectedDate,
    })
  );
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
      nextDateDisabled={selectedDate === today}
    />
  );
};
