import dayjs from "dayjs";
import { FC } from "react";
import { useTrackerStore } from "../../../../store/TrackerStore";
import { cn } from "../../../../utils";

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
    <div className="flex flex-row w-full justify-between px-[5%] py-[20px] min-h-[90px]">
      {weekDays.map((day) => {
        const selectedDay = dayjs().set("day", day).format("dddd");
        return (
          <button
            key={selectedDay}
            className={cn(
              "btn  min-w-[50px] min-h-[50px] p-0",
              selectedDay === selectedDate && "btn-primary"
            )}
            onClick={onWeekDayClick(day)}
          >
            <span
              className={cn(selectedDay === selectedDate ? "text-white" : "")}
            >{`${dayjs().set("day", day).format("ddd")}`}</span>
          </button>
        );
      })}
    </div>
  );
};
