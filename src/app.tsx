import { useMemo, useState } from "react";
import "./app.css";
import dayjs from "dayjs";
import { DietDay, Food, Meals } from "./types";
import { Accordion } from "./components/Accordion";
import { ManageFoodModal } from "./components/ManageFoodModal";

const initializeTabs = () => {
  return [true, false, false, false, false];
};

function App() {
  const [day, setDay] = useState<DietDay>({
    date: dayjs().format(),
    foods: [
      {
        calories: 100,
        name: "Pollo",
        carbohydrates: 10,
        fats: 10,
        proteins: 10,
        meal: "breakfast",
      },
      {
        calories: 100,
        name: "Pollo",
        carbohydrates: 10,
        fats: 10,
        proteins: 10,
        meal: "morningSnacks",
      },
    ],
  });

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
    setDay((prev) => ({
      ...prev,
      foods: [...prev.foods, { ...foodItem, meal }],
    }));
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
    const breakfastFoods: Food[] = [];
    const morningSnacksFoods: Food[] = [];
    const lunchFoods: Food[] = [];
    const eveningSnacksFoods: Food[] = [];
    const dinnerFoods: Food[] = [];
    const [totalCalories, totalCarbohydrates, totalProteins, totalFats] =
      day.foods.reduce(
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
  }, [day]);

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
        <span className="w-full text-center">
          {dayjs(day.date).format("dddd DD/MM/YYYY")}
        </span>
        <div className="flex flex-col w-full items-center">
          <span>Today's summary</span>
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
        />
        <Accordion
          foodItems={eveningSnacksFoods}
          onTabClick={handleTabPress(3)}
          open={openTabs[3]}
          tabName="Evening Snacks"
        />
        <Accordion
          foodItems={dinnerFoods}
          onTabClick={handleTabPress(4)}
          open={openTabs[4]}
          tabName="Dinner"
        />
      </div>
    </>
  );
}

export default App;
