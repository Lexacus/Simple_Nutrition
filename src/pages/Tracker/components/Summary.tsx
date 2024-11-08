import { FC } from "react";
import { WeekDateSelector } from "./date-selector/WeekDateSelector";
import { DateSelector } from "./date-selector/DateSelector";
import { cn } from "@/utils";
import { useSettingsStore } from "@/store/SettingsStore";

type SummaryProps = {
  isPlanner?: boolean;
  totalCalories: number;
  totalCarbohydrates: number;
  totalProteins: number;
  totalFats: number;
};

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
        <span className="text-[14px]">{name}</span>
        <span className="text-[14px]">{`${value.toFixed(1)} / ${max}`}</span>
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
  const { macroLimits } = useSettingsStore(({ macroLimits }) => ({
    macroLimits,
  }));

  return (
    <div className="flex flex-col w-full items-center p-[5px] gap-y-[10px]">
      {isPlanner ? <WeekDateSelector /> : <DateSelector />}
      <div className=" flex flex-col w-full gap-y-[5px] rounded-[16px] p-[10px]">
        <MacroStat
          max={macroLimits.maxCalories}
          name="Calories"
          value={totalCalories}
        />
        <MacroStat
          max={macroLimits.maxCarbohydrates}
          name="Carbs"
          value={totalCarbohydrates}
        />
        <MacroStat
          max={macroLimits.maxProteins}
          name="Proteins"
          value={totalProteins}
          maxIsGoal
        />
        <MacroStat max={macroLimits.maxFats} name="Fats" value={totalFats} />
      </div>
    </div>
  );
};

export default Summary;
