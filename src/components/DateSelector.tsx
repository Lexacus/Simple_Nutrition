import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import { useTrackerStore } from "../store/TrackerStore";
import dayjs from "dayjs";

const today = dayjs().format("YYYY-MM-DD");

export const DateSelector = () => {
  const { selectedDate, setSelectedDate } = useTrackerStore(
    ({ selectedDate, setSelectedDate }) => ({
      selectedDate,
      setSelectedDate,
    })
  );
  return (
    <div className="flex w-full justify-between items-center p-[20px]">
      <AiOutlineCaretLeft
        style={{ fontSize: "30px", cursor: "pointer" }}
        onClick={() => {
          setSelectedDate(
            dayjs(selectedDate).subtract(1, "day").format("YYYY-MM-DD")
          );
        }}
      />
      <div className="flex flex-col items-center">
        <span>{dayjs(selectedDate).format("dddd")}</span>
        <span>{dayjs(selectedDate).format("DD/MM/YYYY")}</span>
      </div>
      {selectedDate !== today ? (
        <AiOutlineCaretRight
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={() => {
            setSelectedDate(
              dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD")
            );
          }}
        />
      ) : (
        <div className="w-[30px] h-[30px]"></div>
      )}
    </div>
  );
};
