import dayjs from "dayjs";
import { FC } from "react";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

type DateSelectorProps = {
  selectedDate: string;
  onLeftArrowClick: () => void;
  onRightArrowClick: () => void;
  previousDateDisabled?: boolean;
  nextDateDisabled?: boolean;
};

const ArrowPlaceholder: FC = () => {
  return <div className="w-[30px] h-[30px]"></div>;
};

export const DateSelector: FC<DateSelectorProps> = ({
  selectedDate,
  onLeftArrowClick,
  onRightArrowClick,
  nextDateDisabled,
  previousDateDisabled,
}) => {
  return (
    <div className="flex w-full justify-between items-center p-[20px]">
      {!previousDateDisabled ? (
        <AiOutlineCaretLeft
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={onLeftArrowClick}
        />
      ) : (
        <ArrowPlaceholder />
      )}
      <div className="flex flex-col items-center">
        <span>{dayjs(selectedDate).format("dddd")}</span>
        <span>{dayjs(selectedDate).format("DD/MM/YYYY")}</span>
      </div>
      {!nextDateDisabled ? (
        <AiOutlineCaretRight
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={onRightArrowClick}
        />
      ) : (
        <ArrowPlaceholder />
      )}
    </div>
  );
};
