import { useMemo } from "react";
import { useTrackerStore } from "../store/TrackerStore";
import { IndexedMeals } from "../types";

type UseMacroCalculationProps = {
  isPlanner?: boolean;
};

export const useMacroCalculation = ({
  isPlanner,
}: UseMacroCalculationProps) => {
  const { trackedDays, selectedDate, addTrackedDay } = useTrackerStore(
    ({ trackedDays, selectedDate, addTrackedDay }) => ({
      trackedDays,
      selectedDate,
      addTrackedDay,
    })
  );

  /* const selectedDay = dayjs(selectedDate).day(); */
  // this memo calculates total nutritional values from the days and creates the day's meals
  // if the day does not exist yet, it simply creates a new empty day in the tracker store
  const { totals, meals } = useMemo(() => {
    // if the current day is not present in the store and we are in tracker, create it.
    if (!trackedDays[selectedDate]) {
      addTrackedDay(selectedDate);
    }

    // initialize indexed arrays of foods divided by meal
    const breakfastFoods: IndexedMeals = [];
    const morningSnacksFoods: IndexedMeals = [];
    const lunchFoods: IndexedMeals = [];
    const eveningSnacksFoods: IndexedMeals = [];
    const dinnerFoods: IndexedMeals = [];

    // this reduce calculates total calories, carbs, proteins and fats based on the selected date
    const [totalCalories, totalCarbohydrates, totalProteins, totalFats] = (
      trackedDays[selectedDate]?.foods ?? []
    ).reduce(
      (acc, next, i) => {
        switch (next.meal) {
          case "breakfast":
            breakfastFoods.push({ food: next, index: i });
            break;
          case "morningSnacks":
            morningSnacksFoods.push({ food: next, index: i });
            break;
          case "lunch":
            lunchFoods.push({ food: next, index: i });
            break;
          case "eveningSnacks":
            eveningSnacksFoods.push({ food: next, index: i });
            break;
          case "dinner":
            dinnerFoods.push({ food: next, index: i });
            break;

          default:
            break;
        }

        return [
          acc[0] + Number(next.calories),
          acc[1] + Number(next.carbohydrates),
          acc[2] + Number(next.proteins),
          acc[3] + Number(next.fats),
        ];
      },
      [0, 0, 0, 0]
    );

    return {
      totals: {
        totalCalories: parseFloat(totalCalories.toFixed(2)),
        totalCarbohydrates: parseFloat(totalCarbohydrates.toFixed(2)),
        totalProteins: parseFloat(totalProteins.toFixed(2)),
        totalFats: parseFloat(totalFats.toFixed(2)),
      },
      meals: {
        breakfastFoods,
        morningSnacksFoods,
        lunchFoods,
        eveningSnacksFoods,
        dinnerFoods,
      },
    };
  }, [trackedDays, selectedDate, addTrackedDay]);

  return {
    totals,
    meals,
  };
};
