/* import dayjs from "dayjs";
import { useMemo } from "react";
import { Accordion } from "../components/Accordion";
import { WeekDateSelector } from "../components/date-selector/WeekDateSelector";
import { useDietPlanStore } from "../store/DietPlanStore";
import { useTrackerStore } from "../store/TrackerStore";
import { Food, IndexedMeals } from "../types"; */

const DietPlanPage = () => {
  return <></>;
  /*   const { selectedFood, selectedDate, setSelectedFood } = useTrackerStore(
    ({ selectedFood, selectedDate, setSelectedFood }) => ({
      selectedFood,
      selectedDate,
      setSelectedFood,
    })
  );

  const { dietPlan, addFoodToDay, editDay, removeFoodFromDay } =
    useDietPlanStore(
      ({ dietPlan, addFoodToDay, editDay, removeFoodFromDay }) => ({
        dietPlan,
        addFoodToDay,
        editDay,
        removeFoodFromDay,
      })
    );

  const selectedDay = dayjs(selectedDate).day();

  const onFoodSaveToDay = (foodItem: Food) => {
    addFoodToDay(selectedDay, foodItem);
  };

  const onFoodEdit = ({
    foodItem,
    index,
  }: {
    foodItem: Food;
    index: number;
  }) => {
    editDay(selectedDay, foodItem, index);
  };

  const onDeleteFromDay = (index: number) => {
    removeFoodFromDay(selectedDay, index);
    setSelectedFood(undefined);
  };

  // this memo calculates total nutritional values from the days and creates the day's meals
  // if the day does not exist yet, it simply creates a new empty day in the tracker store
  const {
    totalCalories,
    totalCarbohydrates,
    totalProteins,
    totalFats,
    breakfastFoods,
    morningSnacksFoods,
    lunchFoods,
    eveningSnacksFoods,
    dinnerFoods,
  } = useMemo(() => {
    // if the current day is not present in the store, create it.

    // initialize indexed arrays of foods divided by meal
    const breakfastFoods: IndexedMeals = [];
    const morningSnacksFoods: IndexedMeals = [];
    const lunchFoods: IndexedMeals = [];
    const eveningSnacksFoods: IndexedMeals = [];
    const dinnerFoods: IndexedMeals = [];

    // this reduce calculates total calories, carbs, proteins and fats based on the selected date
    const [totalCalories, totalCarbohydrates, totalProteins, totalFats] = (
      dietPlan[selectedDay] ?? []
    ).reduce(
      (acc, next, i) => {
        switch (next.meal) {
          case "breakfast":
            breakfastFoods.push({ foodItem: next, index: i });
            break;
          case "morningSnacks":
            morningSnacksFoods.push({ foodItem: next, index: i });
            break;
          case "lunch":
            lunchFoods.push({ foodItem: next, index: i });
            break;
          case "eveningSnacks":
            eveningSnacksFoods.push({ foodItem: next, index: i });
            break;
          case "dinner":
            dinnerFoods.push({ foodItem: next, index: i });
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
      totalCalories: parseFloat(totalCalories.toFixed(2)),
      totalCarbohydrates: parseFloat(totalCarbohydrates.toFixed(2)),
      totalProteins: parseFloat(totalProteins.toFixed(2)),
      totalFats: parseFloat(totalFats.toFixed(2)),
      breakfastFoods,
      morningSnacksFoods,
      lunchFoods,
      eveningSnacksFoods,
      dinnerFoods,
    };
  }, [dietPlan, selectedDay]);

  return (
    <>
      {selectedFood && (
        <ManageFoodModal
          selectedFood={selectedFood}
          onClose={() => {
            setSelectedFood(undefined);
          }}
          onSaveToDay={onFoodSaveToDay}
          onEdit={onFoodEdit}
          onDeleteFromDay={onDeleteFromDay}
        />
      )}
      <div className="flex flex-col w-full h-full max-h-screen">
        <div className="flex flex-col w-full items-center">
          <WeekDateSelector />
          <span>Summary</span>
          <span>Calories: {totalCalories}</span>
          <div className="flex w-full justify-center gap-x-[10px]">
            <span>Carbs: {totalCarbohydrates}</span>
            <span>Proteins: {totalProteins}</span>
            <span>Fats: {totalFats}</span>
          </div>
        </div>
        <div className="overflow-auto border-t border-black">
          <div className=" h-fit flex flex-col mx-[15px] rounded-[16px] my-[15px] overflow-hidden">
            <Accordion
              type="diet"
              foodItems={breakfastFoods}
              tabName="breakfast"
            />
            <Accordion
              type="diet"
              foodItems={morningSnacksFoods}
              tabName="morningSnacks"
            />
            <Accordion type="diet" foodItems={lunchFoods} tabName="lunch" />
            <Accordion
              type="diet"
              foodItems={eveningSnacksFoods}
              tabName="eveningSnacks"
            />
            <Accordion type="diet" foodItems={dinnerFoods} tabName="dinner" />
          </div>
        </div>
      </div>
    </>
  ); */
};

export default DietPlanPage;
