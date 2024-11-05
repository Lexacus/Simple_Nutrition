import { FC } from "react";
import { WeekDateSelector } from "./date-selector/WeekDateSelector";
import { DateSelector } from "./date-selector/DateSelector";
import { cn } from "@/utils";

type SummaryProps = {
  isPlanner?: boolean;
  totalCalories: number;
  totalCarbohydrates: number;
  totalProteins: number;
  totalFats: number;
};

// TODO: Implement max macros selection in settings instead of fixed numbers

const maxCalories = 2500;
const maxCarbohydrates = 300;
const maxProteins = 150;
const maxFats = 70;

const MacroStat = ({
  name,
  max,
  value,
  maxIsGoal = false,
}: {
  name: string;
  value: number;
  max: number;
  maxIsGoal?: boolean;
}) => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className=" flex justify-between w-full px-[5px]">
        <span>{name}</span>
        <span>{`${value} / ${max}`}</span>
      </div>
      <progress
        className={cn(
          "progress w-full",
          value < max
            ? "progress-primary"
            : maxIsGoal
            ? "progress-accent"
            : "progress-error"
        )}
        value={value}
        max={max}
      />
    </div>
  );
};

const Summary: FC<SummaryProps> = ({
  totalCalories,
  totalCarbohydrates,
  totalFats,
  totalProteins,
  isPlanner,
}) => {
  return (
    <div className="flex flex-col w-full items-center p-[5px] gap-y-[10px]">
      {isPlanner ? <WeekDateSelector /> : <DateSelector />}
      <div className="collapse collapse-arrow border border-primary rounded-[16px]">
        <input type="checkbox" defaultChecked={true} />
        <div className="collapse-title text-xl font-medium">Macros</div>
        <div className="collapse-content flex flex-col gap-y-[5px]">
          <MacroStat max={maxCalories} name="Calories" value={totalCalories} />
          <MacroStat
            max={maxCarbohydrates}
            name="Carbs"
            value={totalCarbohydrates}
          />
          <MacroStat
            max={maxProteins}
            name="Proteins"
            value={totalProteins}
            maxIsGoal
          />
          <MacroStat max={maxFats} name="Fats" value={totalFats} />
        </div>
      </div>
    </div>
  );
};

export default Summary;
