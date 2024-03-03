import { FC } from "react";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillEdit,
  AiOutlineClose,
} from "react-icons/ai";
import { Food, Meals } from "../types";
import { Button } from "./common/Button";
import { useTrackerStore } from "../store/TrackerStore";

interface AccordionProps {
  tabName: Meals;
  onTabClick: () => void;
  open: boolean;
  foodItems?: { foodItem: Food; index: number }[];
}

export const Accordion: FC<AccordionProps> = ({
  onTabClick,
  open,
  tabName,
  foodItems,
}) => {
  const { days, editDay, selectedDate, setSelectedFood } = useTrackerStore(
    ({ days, editDay, selectedDate, setSelectedFood }) => ({
      days,
      editDay,
      selectedDate,
      setSelectedFood,
    })
  );

  const onAddClick = () => {
    setSelectedFood({
      foodItem: {
        meal: tabName,
      },
      type: "addToDay",
      index: 0,
    });
  };

  const onEditClick = (index: number) => {
    setSelectedFood({
      foodItem: {
        ...days[selectedDate].foods[index],
      },
      type: "edit",
      index,
    });
  };

  const onDeleteClick = (index: number) => {
    const newFoods = days[selectedDate].foods.filter((_, i) => i !== index);
    editDay(selectedDate, {
      foods: [...newFoods],
    });
  };

  return (
    <div className="flex flex-col px-[10px] gap-y-[10px] py-[10px]">
      <div onClick={onTabClick} className="flex justify-between items-center">
        <span className="capitalize">{`${tabName} ${
          foodItems?.length && foodItems.length > 0
            ? `(${foodItems.length})`
            : ""
        }`}</span>
        {open ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </div>

      {open && (
        <div className="flex flex-col">
          {foodItems?.map(({ foodItem: { name, grams }, index }) => {
            return (
              <div
                key={`${tabName}_${name}`}
                className="flex justify-between items-center"
              >
                <span>{` - ${name} (${grams}g)`}</span>
                <div className="flex justify-center items-center gap-x-[10px]">
                  <AiFillEdit
                    style={{ fontSize: "25px" }}
                    onClick={() => {
                      onEditClick(index);
                    }}
                  />
                  <AiOutlineClose
                    style={{ fontSize: "25px" }}
                    onClick={() => {
                      onDeleteClick(index);
                    }}
                  />
                </div>
              </div>
            );
          })}
          {!foodItems?.length && <span>No foods in this meal yet</span>}
          <Button
            className="text-blue-600 bg-transparent border-none"
            onClick={onAddClick}
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
};
