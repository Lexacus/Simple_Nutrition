import { FC } from "react";
import { WeekDateSelector } from "./date-selector/WeekDateSelector";
import { DateSelector } from "./date-selector/DateSelector";
import { useSettingsStore } from "@/store/SettingsStore";

type SummaryProps = {
  isPlanner?: boolean;
  totalCalories: number;
  totalCarbohydrates: number;
  totalProteins: number;
  totalFats: number;
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
    <div className="flex flex-col w-full items-center p-2 gap-2">
      {isPlanner ? <WeekDateSelector /> : <DateSelector />}
      
      {/* Calories Card */}
      <div className="card bg-base-200 shadow-sm w-full">
        <div className="card-body p-2">
          <div className="flex justify-between items-center">
            <span className="text-sm opacity-70">Calories</span>
            <span className="text-sm font-semibold">
              {totalCalories}/{macroLimits.maxCalories}
            </span>
          </div>
          <progress 
            className="progress progress-primary w-full h-2" 
            value={totalCalories} 
            max={macroLimits.maxCalories}
          />
        </div>
      </div>

      {/* Macros Grid */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {/* Carbs */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body p-2">
            <div className="flex flex-col">
              <span className="text-xs opacity-70">Carbs</span>
              <span className="text-sm font-semibold text-secondary">
                {totalCarbohydrates}/{macroLimits.maxCarbohydrates}
              </span>
              <progress 
                className="progress progress-secondary w-full h-1.5" 
                value={totalCarbohydrates}
                max={macroLimits.maxCarbohydrates}
              />
            </div>
          </div>
        </div>

        {/* Proteins */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body p-2">
            <div className="flex flex-col">
              <span className="text-xs opacity-70">Protein</span>
              <span className="text-sm font-semibold text-accent">
                {totalProteins}/{macroLimits.maxProteins}
              </span>
              <progress 
                className="progress progress-accent w-full h-1.5" 
                value={totalProteins}
                max={macroLimits.maxProteins}
              />
            </div>
          </div>
        </div>

        {/* Fats */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body p-2">
            <div className="flex flex-col">
              <span className="text-xs opacity-70">Fats</span>
              <span className="text-sm font-semibold text-info">
                {totalFats}/{macroLimits.maxFats}
              </span>
              <progress 
                className="progress progress-info w-full h-1.5" 
                value={totalFats}
                max={macroLimits.maxFats}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
