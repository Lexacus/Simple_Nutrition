import { useState } from "react";
import "./app.css";
import dayjs from "dayjs";
import { DietDay } from "./types";
import { Accordion } from "./components/Accordion";

const initializeTabs = () => {
  return [true, false, false, false, false];
};

function App() {
  const [day, setDay] = useState<DietDay>({
    date: dayjs().format(),
    food: {
      breakfast: [
        {
          calories: 100,
          name: "Pollo",
          carbohydrates: 10,
          fats: 10,
          proteins: 10,
        },
      ],
      morningSnacks: [
        {
          calories: 100,
          name: "Pollo",
          carbohydrates: 10,
          fats: 10,
          proteins: 10,
        },
      ],
    },
  });

  const [openTabs, setOpenTabs] = useState(initializeTabs);
  const [open, setOpen] = useState(false);

  const handleTabPress = (tab: number) => () => {
    setOpenTabs((prev) => {
      const newTabs = [...prev];
      newTabs[tab] = !prev[tab];
      return newTabs;
    });
  };

  return (
    <div className="flex flex-col w-full h-full border border-red-700">
      <span className="w-full text-center">
        {dayjs(day.date).format("dddd DD/MM/YYYY")}
      </span>
      <div className="flex flex-col w-full items-center">
        <span>Today's summary</span>
        <span>
          Calories:{" "}
          {day?.food.breakfast?.reduce((acc, next) => {
            return acc + next.calories;
          }, 0)}
        </span>
        <div className="flex w-full justify-center gap-x-[10px]">
          <span>
            Proteins:{" "}
            {day?.food.breakfast?.reduce((acc, next) => {
              return acc + next.proteins;
            }, 0)}
          </span>
          <span>
            Carbohydrates:{" "}
            {day?.food.breakfast?.reduce((acc, next) => {
              return acc + next.carbohydrates;
            }, 0)}
          </span>
          <span>
            Fats:{" "}
            {day?.food.breakfast?.reduce((acc, next) => {
              return acc + next.fats;
            }, 0)}
          </span>
        </div>
      </div>
      <Accordion
        foodItems={day?.food.breakfast}
        onTabClick={handleTabPress(0)}
        open={openTabs[0]}
        tabName="Breakfast"
      />
      <Accordion
        foodItems={day?.food.morningSnacks}
        onTabClick={handleTabPress(1)}
        open={openTabs[1]}
        tabName="Morning Snacks"
      />
      <Accordion
        foodItems={day?.food.lunch}
        onTabClick={handleTabPress(2)}
        open={openTabs[2]}
        tabName="Lunch"
      />
      <Accordion
        foodItems={day?.food.breakfast}
        onTabClick={handleTabPress(3)}
        open={openTabs[3]}
        tabName="Evening Snacks"
      />
      <Accordion
        foodItems={day?.food.breakfast}
        onTabClick={handleTabPress(4)}
        open={openTabs[4]}
        tabName="Dinner"
      />
    </div>
  );
}

export default App;
