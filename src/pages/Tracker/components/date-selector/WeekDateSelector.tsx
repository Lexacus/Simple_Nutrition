import { useTrackerStore } from "@/store/TrackerStore";
import { cn } from "@/utils";
import dayjs from "dayjs";
import { FC } from "react";

const weekDays = [1, 2, 3, 4, 5, 6, 0];

export const WeekDateSelector: FC = () => {
  const { selectedDate, setSelectedDate } = useTrackerStore(
    ({ selectedDate, setSelectedDate }) => ({
      selectedDate,
      setSelectedDate,
    })
  );

  const onWeekDayClick = (day: number) => () => {
    setSelectedDate(dayjs().set("day", day).format("dddd"));
  };

  return (
    <div className="w-full card bg-base-200 shadow-sm card-body grid grid-cols-7 gap-1 p-[0.75rem]">
      {weekDays.map((day) => {
        const selectedDay = dayjs().set("day", day).format("dddd");
        return (
          <button
            key={selectedDay}
            onClick={onWeekDayClick(day)}
            className={cn(
              "flex flex-col items-center justify-center p-1 rounded-lg transition-colors",
              selectedDay === selectedDate
                ? "bg-primary text-primary-content"
                : "hover:bg-base-300"
            )}
          >
            <span className="text-sm">
              {dayjs().set("day", day).format("ddd")}
            </span>
          </button>
        );
      })}
    </div>
  );
};
