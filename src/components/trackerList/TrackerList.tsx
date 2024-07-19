import { FC } from "react";
import { IndexedMeals } from "../../types";
import MealList from "../MealList";

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
    <div className="overflow-auto border-t border-black">
      <div className=" h-fit flex flex-col mx-[5px] rounded-[16px] mt-[5px] max-h-[calc(100vh-221px)]">
        <MealList foods={breakfastFoods} tabName="breakfast" />
        <MealList foods={morningSnacksFoods} tabName="morningSnacks" />
        <MealList foods={lunchFoods} tabName="lunch" />
        <MealList foods={eveningSnacksFoods} tabName="eveningSnacks" />
        <MealList foods={dinnerFoods} tabName="dinner" />
      </div>
    </div>
  );
};

export default TrackerList;
