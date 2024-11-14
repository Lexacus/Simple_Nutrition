import { FC } from "react";
import { IndexedMeals } from "@/types";
import MealList from "./MealList";

type TrackerListProps = {
  breakfastFoods: IndexedMeals;
  morningSnacksFoods: IndexedMeals;
  lunchFoods: IndexedMeals;
  eveningSnacksFoods: IndexedMeals;
  dinnerFoods: IndexedMeals;
};

const TrackerList: FC<TrackerListProps> = ({
  breakfastFoods,
  dinnerFoods,
  eveningSnacksFoods,
  lunchFoods,
  morningSnacksFoods,
}) => {
  return (
    <div className="flex flex-col gap-1 px-2">
      <MealList
        foods={breakfastFoods}
        tabName="Breakfast"
        mealName="breakfast"
      />
      <MealList
        foods={morningSnacksFoods}
        tabName="Morning snacks"
        mealName="morningSnacks"
      />
      <MealList foods={lunchFoods} tabName="Lunch" mealName="lunch" />
      <MealList
        foods={eveningSnacksFoods}
        tabName="Evening snacks"
        mealName="eveningSnacks"
      />
      <MealList foods={dinnerFoods} tabName="Dinner" mealName="dinner" />
    </div>
  );
};

export default TrackerList;
