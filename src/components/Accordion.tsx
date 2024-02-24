import { FC } from "react";
import { Food } from "../types";

interface AccordionProps {
  tabName: string;
  onTabClick: () => void;
  open: boolean;
  foodItems?: Food[];
}

export const Accordion: FC<AccordionProps> = ({
  onTabClick,
  open,
  tabName,
  foodItems,
}) => {
  return (
    <div className="flex flex-col border border-red-500">
      <span onClick={onTabClick}>{tabName}</span>
      <span>
        {open &&
          foodItems?.map((foodItem) => {
            return (
              <span key={`${tabName}_${foodItem.name}`}>
                {" "}
                {" - "}
                {foodItem.name}
              </span>
            );
          })}
      </span>
    </div>
  );
};
