import { FC } from "react";
import { Food } from "../types";
import { Button } from "./common/Button";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillEdit,
  AiOutlineClose,
  AiOutlinePlus,
} from "react-icons/ai";

interface AccordionProps {
  tabName: string;
  onTabClick: () => void;
  open: boolean;
  foodItems?: { foodItem: Food; index: number }[];
  onAddClick?: () => void;
  onEditClick?: (index: number) => void;
  onDeleteClick?: (index: number) => void;
}

export const Accordion: FC<AccordionProps> = ({
  onTabClick,
  open,
  tabName,
  foodItems,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="flex flex-col px-[10px] gap-y-[10px] py-[10px]">
      <div onClick={onTabClick} className="flex justify-between items-center">
        <span>{tabName}</span>
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
                      onEditClick?.(index);
                    }}
                  />
                  <AiOutlineClose
                    style={{ fontSize: "25px" }}
                    onClick={() => {
                      onDeleteClick?.(index);
                    }}
                  />
                </div>
              </div>
            );
          })}
          <Button
            className="rounded-full w-[40px] h-[40px]"
            onClick={onAddClick}
          >
            <AiOutlinePlus style={{ fontSize: "50px" }} />
          </Button>
        </div>
      )}
    </div>
  );
};
