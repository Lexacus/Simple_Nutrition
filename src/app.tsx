import { useEffect, useMemo, useState } from "react";
import "./app.css";
import dayjs from "dayjs";
import { Food, Meals } from "./types";
import { Accordion } from "./components/Accordion";
import { ManageFoodModal } from "./components/ManageFoodModal";
import { useTrackerStore } from "./store/TrackerStore";
import { DateSelector } from "./components/DateSelector";

const initializeTabs = () => {
  return [true, false, false, false, false];
};

const today = dayjs().format("YYYY-MM-DD");

function App() {
  const { selectedDate, setSelectedDate, days, editDay, addDay } =
    useTrackerStore(
      ({ selectedDate, setSelectedDate, days, editDay, addDay }) => ({
        selectedDate,
        setSelectedDate,
        days,
        editDay,
        addDay,
      })
    );

  const [openTabs, setOpenTabs] = useState(initializeTabs);
  const [selectedMeal, setSelectedMeal] = useState<Meals>();

  const handleTabPress = (tab: number) => () => {
    setOpenTabs((prev) => {
      const newTabs = [...prev];
      newTabs[tab] = !prev[tab];
      return newTabs;
    });
  };

  const onAddClick = (meal: Meals) => () => {
    setSelectedMeal(meal);
  };

  const onSave = ({ meal, foodItem }: { meal: Meals; foodItem: Food }) => {
    editDay(selectedDate, {
      foods: [...days[selectedDate].foods, { ...foodItem, meal }],
    });
  };

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
    if (!days[selectedDate]) {
      addDay(selectedDate);
    }
    const breakfastFoods: Food[] = [];
    const morningSnacksFoods: Food[] = [];
    const lunchFoods: Food[] = [];
    const eveningSnacksFoods: Food[] = [];
    const dinnerFoods: Food[] = [];
    const [totalCalories, totalCarbohydrates, totalProteins, totalFats] = (
      days[selectedDate].foods ?? []
    ).reduce(
      (acc, next) => {
        switch (next.meal) {
          case "breakfast":
            breakfastFoods.push(next);
            break;
          case "morningSnacks":
            morningSnacksFoods.push(next);
            break;
          case "lunch":
            lunchFoods.push(next);
            break;
          case "eveningSnacks":
            eveningSnacksFoods.push(next);
            break;
          case "dinner":
            dinnerFoods.push(next);
            break;

          default:
            break;
        }

        return [
          acc[0] + Number(next.calories),
          acc[2] + Number(next.carbohydrates),
          acc[1] + Number(next.proteins),
          acc[3] + Number(next.fats),
        ];
      },
      [0, 0, 0, 0]
    );

    return {
      totalCalories,
      totalCarbohydrates,
      totalProteins,
      totalFats,
      breakfastFoods,
      morningSnacksFoods,
      lunchFoods,
      eveningSnacksFoods,
      dinnerFoods,
    };
  }, [days, selectedDate, addDay]);

  useEffect(() => {
    setSelectedDate(dayjs(today).format("YYYY-MM-DD"));
  }, []);

  return (
    <>
      {selectedMeal && (
        <ManageFoodModal
          selectedMeal={selectedMeal}
          onClose={() => {
            setSelectedMeal(undefined);
          }}
          onSave={onSave}
        />
      )}
      <div className="flex flex-col w-full h-full border border-red-700">
        <div className="flex flex-col w-full items-center">
          <DateSelector />
          <span>Summary</span>
          <span>Calories: {totalCalories}</span>
          <div className="flex w-full justify-center gap-x-[10px]">
            <span>Carbs: {totalCarbohydrates}</span>
            <span>Proteins: {totalProteins}</span>
            <span>Fats: {totalFats}</span>
          </div>
        </div>
        <Accordion
          foodItems={breakfastFoods}
          onTabClick={handleTabPress(0)}
          open={openTabs[0]}
          tabName="Breakfast"
          onAddClick={onAddClick("breakfast")}
        />
        <Accordion
          foodItems={morningSnacksFoods}
          onTabClick={handleTabPress(1)}
          open={openTabs[1]}
          tabName="Morning Snacks"
          onAddClick={onAddClick("morningSnacks")}
        />
        <Accordion
          foodItems={lunchFoods}
          onTabClick={handleTabPress(2)}
          open={openTabs[2]}
          tabName="Lunch"
          onAddClick={onAddClick("lunch")}
        />
        <Accordion
          foodItems={eveningSnacksFoods}
          onTabClick={handleTabPress(3)}
          open={openTabs[3]}
          tabName="Evening Snacks"
          onAddClick={onAddClick("eveningSnacks")}
        />
        <Accordion
          foodItems={dinnerFoods}
          onTabClick={handleTabPress(4)}
          open={openTabs[4]}
          tabName="Dinner"
          onAddClick={onAddClick("dinner")}
        />
      </div>
    </>
  );
}

export default App;
