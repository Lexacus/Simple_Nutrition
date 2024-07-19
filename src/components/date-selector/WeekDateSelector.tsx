import dayjs from "dayjs";
import { FC } from "react";
import { useTrackerStore } from "../../store/TrackerStore";
import { cn } from "../../utils";

const weekDays = [0, 1, 2, 3, 4, 5, 6];

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
    <div className="flex flex-row w-full justify-between px-[5%] py-[20px]">
      {weekDays.map((day) => (
        <div
          className={cn(
            "flex items-center justify-center border min-w-[50px] min-h-[50px] text-center rounded-[16px] cursor-pointer",
            dayjs().set("day", day).format("dddd") === selectedDate &&
              "bg-blue-600"
          )}
          onClick={onWeekDayClick(day)}
        >
          <span
            className={cn(
              selectedDate ===
                dayjs(selectedDate).set("day", day).format("dddd")
                ? "text-white"
                : ""
            )}
          >{`${dayjs().set("day", day).format("ddd")}`}</span>
        </div>
      ))}
    </div>
  );
};
