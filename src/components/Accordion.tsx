import { FC } from "react";
import { Food } from "../types";
import { Button } from "./common/Button";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";

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
    <div className="flex flex-col border border-red-500 px-[10px]">
      <span onClick={onTabClick}>{tabName}</span>
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
          <Button onClick={onAddClick}>Aggiungi</Button>
        </div>
      )}
    </div>
  );
};
