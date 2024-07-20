import { FC } from "react";
import { WeekDateSelector } from "./date-selector/WeekDateSelector";
import { DateSelector } from "./date-selector/DateSelector";

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
  return (
    <div className="flex flex-col w-full items-center">
      {isPlanner ? <WeekDateSelector /> : <DateSelector />}
      <span>Summary</span>
      <span>Calories: {totalCalories}</span>
      <div className="flex w-full justify-center gap-x-[10px]">
        <span>Carbs: {totalCarbohydrates}</span>
        <span>Proteins: {totalProteins}</span>
        <span>Fats: {totalFats}</span>
      </div>
    </div>
  );
};

export default Summary;
