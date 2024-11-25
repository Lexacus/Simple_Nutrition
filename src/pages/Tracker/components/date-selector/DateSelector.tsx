import { useTrackerStore } from "@/store/TrackerStore";
import { cn } from "@/utils";
import dayjs from "dayjs";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const DateSelector = () => {
  const { selectedDate, setSelectedDate } = useTrackerStore(
    ({ selectedDate, setSelectedDate }) => ({
      selectedDate,
      setSelectedDate,
    })
  );

  const currentDate = dayjs(selectedDate);

  const handlePrevDay = () => {
    setSelectedDate(currentDate.subtract(1, "day").format("YYYY-MM-DD"));
  };

  const handleNextDay = () => {
    setSelectedDate(currentDate.add(1, "day").format("YYYY-MM-DD"));
  };

  return (
    <div className="w-full px-2 card bg-base-200 shadow-sm card-body p-2">
      <div className="flex justify-between items-center mb-2">
        <button className="btn btn-ghost btn-sm px-2" onClick={handlePrevDay}>
          <AiOutlineLeft className="h-4 w-4" />
        </button>

        <span className="text-lg font-semibold">
          {currentDate.format("D MMM YYYY")}
        </span>

        <button className="btn btn-ghost btn-sm px-2" onClick={handleNextDay}>
          <AiOutlineRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => {
          const isCurrentDay = currentDate.format("ddd") === day;
          return (
            <div
              key={day}
              className={cn(
                "flex flex-col items-center justify-center p-1 rounded-lg text-xs",
                isCurrentDay ? "bg-primary text-primary-content" : "opacity-70"
              )}
            >
              <span>{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
