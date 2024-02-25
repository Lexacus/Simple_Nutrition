import { FC } from "react";
import { Food } from "../types";

interface AccordionProps {
  tabName: string;
  onTabClick: () => void;
  open: boolean;
  foodItems?: Food[];
  onAddClick?: () => void;
}

export const Accordion: FC<AccordionProps> = ({
  onTabClick,
  open,
  tabName,
  foodItems,
  onAddClick,
}) => {
  return (
    <div className="flex flex-col border border-red-500">
      <span onClick={onTabClick}>{tabName}</span>
      {open && (
        <div className="flex flex-col">
          {foodItems?.map((foodItem) => {
            return (
              <span key={`${tabName}_${foodItem.name}`}>
                {" "}
                {" - "}
                {foodItem.name}
              </span>
            );
          })}
          <button
            onClick={() => {
              onAddClick?.();
            }}
          >
            Aggiungi
          </button>
        </div>
      )}
    </div>
  );
};
