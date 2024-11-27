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
  size = "lg",
  color,
}: {
  name: string;
  value: number;
  max: number;
  maxIsGoal?: boolean;
  size?: "sm" | "lg";
  color?: "text-error" | "text-info" | "text-warning";
}) => {
  return (
    <div className="card bg-base-200 shadow-sm w-full card-body p-2">
      <div className="flex justify-between items-center">
        <span
          className={cn("opacity-70", size === "sm" ? "text-xs" : "text-sm")}
        >
          {name}
        </span>
        <span
          className={cn(
            "font-semibold",
            size === "sm" ? "text-xs" : "text-sm",
            color
          )}
        >
          {Math.round(value)}/{max}
        </span>
      </div>
      <progress
        className={cn(
          "progress progress-primary w-full h-2",
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
    <div className="flex flex-col w-full items-center p-2 gap-y-[10px]">
      {isPlanner ? <WeekDateSelector /> : <DateSelector />}
      <div className=" flex flex-col w-full gap-y-[10px] rounded-[16px]">
        <MacroStat
          max={macroLimits.maxCalories}
          name="Calories"
          value={totalCalories}
        />
        <div className="grid grid-cols-3 gap-2 w-full">
          <MacroStat
            name="Carbs"
            value={totalCarbohydrates}
            max={macroLimits.maxCarbohydrates}
            size="sm"
            color="text-info"
          />

          <MacroStat
            name="Proteins"
            value={totalProteins}
            max={macroLimits.maxProteins}
            size="sm"
            color="text-warning"
          />

          <MacroStat
            name="Fats"
            value={totalFats}
            max={macroLimits.maxFats}
            size="sm"
            color="text-error"
          />
        </div>
      </div>
    </div>
  );
};

export default Summary;
