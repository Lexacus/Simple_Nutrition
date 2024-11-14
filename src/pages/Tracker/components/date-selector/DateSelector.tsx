import { useTrackerStore } from "@/store/TrackerStore";
import dayjs from "dayjs";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export const DateSelector = () => {
  const { selectedDate, setSelectedDate } = useTrackerStore(
    ({ selectedDate, setSelectedDate }) => ({
      selectedDate,
      setSelectedDate,
    })
  );

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDate = dayjs(selectedDate);
  
  const handlePrevDay = () => {
    setSelectedDate(currentDate.subtract(1, "day").format("YYYY-MM-DD"));
  };

  const handleNextDay = () => {
    setSelectedDate(currentDate.add(1, "day").format("YYYY-MM-DD"));
  };

  return (
    <div className="w-full px-2">
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body p-2">
          {/* Data e navigazione */}
          <div className="flex justify-between items-center mb-2">
            <button 
              className="btn btn-ghost btn-sm px-2" 
              onClick={handlePrevDay}
            >
              <AiOutlineLeft className="h-4 w-4" />
            </button>
            
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">
                {currentDate.format("D MMM YYYY")}
              </span>
              <span className="text-xs opacity-70">
                {currentDate.format("dddd")}
              </span>
            </div>

            <button 
              className="btn btn-ghost btn-sm px-2" 
              onClick={handleNextDay}
            >
              <AiOutlineRight className="h-4 w-4" />
            </button>
          </div>

          {/* Week days */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day, index) => {
              const isCurrentDay = currentDate.format("ddd") === day;
              return (
                <div
                  key={day}
                  className={`flex flex-col items-center justify-center p-1 rounded-lg text-xs
                    ${isCurrentDay ? 'bg-primary text-primary-content' : 'opacity-70'}`}
                >
                  <span className="hidden sm:block">{day}</span>
                  <span className="sm:hidden">{day.charAt(0)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
