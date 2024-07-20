import dayjs from "dayjs";
import { FC } from "react";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import { useTrackerStore } from "../../../../store/TrackerStore";

const today = dayjs().format("YYYY-MM-DD");

const ArrowPlaceholder: FC = () => {
  return <div className="w-[30px] h-[30px]"></div>;
};

export const DateSelector: FC = () => {
  const { selectedDate, setSelectedDate } = useTrackerStore(
    ({ selectedDate, setSelectedDate }) => ({
      selectedDate,
      setSelectedDate,
    })
  );
  const setPreviousDate = () => {
    setSelectedDate(
      dayjs(selectedDate).subtract(1, "day").format("YYYY-MM-DD")
    );
  };

  const setNextDate = () => {
    setSelectedDate(dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD"));
  };

  return (
    <div className="flex w-full justify-between items-center p-[20px] min-h-[90px]">
      {/*  {!previousDateDisabled ? ( */}
      <AiOutlineCaretLeft
        style={{ fontSize: "30px", cursor: "pointer" }}
        onClick={setPreviousDate}
      />
      {/* ) : (
        <ArrowPlaceholder />
      )} */}
      <div className="flex flex-col items-center">
        <span>{dayjs(selectedDate).format("dddd")}</span>
        <span>{dayjs(selectedDate).format("DD/MM/YYYY")}</span>
      </div>
      {selectedDate !== today ? (
        <AiOutlineCaretRight
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={setNextDate}
        />
      ) : (
        <ArrowPlaceholder />
      )}
    </div>
  );
};
