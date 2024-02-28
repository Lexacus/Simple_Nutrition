import { useEffect, useMemo, useState } from "react";
import "./app.css";
import dayjs from "dayjs";
import { Food, Meals } from "./types";
import { Accordion } from "./components/Accordion";
import { ManageFoodModal } from "./components/ManageFoodModal";
import { useTrackerStore } from "./store/TrackerStore";
import { DateSelector } from "./components/DateSelector";
import { LineDivider } from "./components/ui/LineDivider";
import { Button } from "./components/common/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useFoodStore } from "./store/FoodStore";
import { Clipboard } from "@capacitor/clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initializeTabs = () => {
  return [false, false, false, false, false];
};

const today = dayjs().format("YYYY-MM-DD");

function App() {
  const { selectedDate, setSelectedDate, days, setDays, editDay, addDay } =
    useTrackerStore(
      ({ selectedDate, setSelectedDate, days, setDays, editDay, addDay }) => ({
        selectedDate,
        setSelectedDate,
        days,
        setDays,
        editDay,
        addDay,
      })
    );

  const { foods, setFoods, upsertFood } = useFoodStore(
    ({ foods, setFoods, upsertFood }) => ({
      foods,
      setFoods,
      upsertFood,
    })
  );

  const [openTabs, setOpenTabs] = useState(initializeTabs);
  const [selectedFood, setSelectedFood] = useState<{
    foodItem?: Partial<Food>;
    type: "addToDay" | "edit" | "addToStore";
    index: number;
  }>();

  const onTabClick = (tab: number) => () => {
    setOpenTabs((prev) => {
      const newTabs = [...prev];
      newTabs[tab] = !prev[tab];
      return newTabs;
    });
  };

  const onAddToDayClick = (meal: Meals) => () => {
    setSelectedFood({
      foodItem: { meal },
      type: "addToDay",
      index: 0,
    });
  };

  const onAddToStoreClick = () => {
    setSelectedFood({
      type: "addToStore",
      index: 0,
    });
  };

  const onEditClick = (index: number) => {
    setSelectedFood({
      foodItem: {
        ...days[selectedDate].foods[index],
      },
      type: "edit",
      index,
    });
  };

  const onDeleteClick = (index: number) => {
    const newFoods = days[selectedDate].foods.filter((_, i) => i !== index);
    editDay(selectedDate, {
      foods: [...newFoods],
    });
  };

  const onFoodSaveToDay = ({
    meal,
    foodItem,
  }: {
    meal: Meals;
    foodItem: Food;
  }) => {
    editDay(selectedDate, {
      foods: [...days[selectedDate].foods, { ...foodItem, meal }],
    });
  };

  const onFoodEdit = ({
    foodItem,
    index,
  }: {
    foodItem: Food;
    index: number;
  }) => {
    const newFoods = days[selectedDate].foods;
    newFoods.splice(index, 1, foodItem);
    editDay(selectedDate, {
      foods: newFoods,
    });
  };

  const onFoodSaveToStore = ({
    meal,
    foodItem,
  }: {
    meal: Meals;
    foodItem: Food;
  }) => {
    upsertFood({
      ...foodItem,
      meal,
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
    const breakfastFoods: { foodItem: Food; index: number }[] = [];
    const morningSnacksFoods: { foodItem: Food; index: number }[] = [];
    const lunchFoods: { foodItem: Food; index: number }[] = [];
    const eveningSnacksFoods: { foodItem: Food; index: number }[] = [];
    const dinnerFoods: { foodItem: Food; index: number }[] = [];
    const [totalCalories, totalCarbohydrates, totalProteins, totalFats] = (
      days[selectedDate].foods ?? []
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
      {selectedFood && (
        <ManageFoodModal
          selectedFood={selectedFood}
          onClose={() => {
            setSelectedFood(undefined);
          }}
          onSaveToDay={onFoodSaveToDay}
          onEdit={onFoodEdit}
          onSaveToStore={onFoodSaveToStore}
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
        <div className="border border-black flex flex-col mx-[15px] rounded-[16px] my-[15px]">
          <Accordion
            foodItems={breakfastFoods}
            onTabClick={onTabClick(0)}
            open={openTabs[0]}
            tabName="Breakfast"
            onAddClick={onAddToDayClick("breakfast")}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
          <LineDivider />
          <Accordion
            foodItems={morningSnacksFoods}
            onTabClick={onTabClick(1)}
            open={openTabs[1]}
            tabName="Morning Snacks"
            onAddClick={onAddToDayClick("morningSnacks")}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
          <LineDivider />
          <Accordion
            foodItems={lunchFoods}
            onTabClick={onTabClick(2)}
            open={openTabs[2]}
            tabName="Lunch"
            onAddClick={onAddToDayClick("lunch")}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
          <LineDivider />
          <Accordion
            foodItems={eveningSnacksFoods}
            onTabClick={onTabClick(3)}
            open={openTabs[3]}
            tabName="Evening Snacks"
            onAddClick={onAddToDayClick("eveningSnacks")}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
          <LineDivider />
          <Accordion
            foodItems={dinnerFoods}
            onTabClick={onTabClick(4)}
            open={openTabs[4]}
            tabName="Dinner"
            onAddClick={onAddToDayClick("dinner")}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        </div>
        <Button
          className="rounded-full w-[50px] h-[50px]"
          onClick={onAddToStoreClick}
        >
          <AiOutlinePlus style={{ fontSize: "50px" }} />
        </Button>
        <div className="flex flex-col gap-y-10 mt-10">
          <Button
            onClick={async () => {
              await Clipboard.write({ string: JSON.stringify(foods) });
              toast("Successfully copied to clipboard", {
                hideProgressBar: true,
                type: "success",
              });
            }}
          >
            Copy food store in clipboard
          </Button>
          <Button
            onClick={async () => {
              const jsonFoods = await Clipboard.read();
              setFoods(JSON.parse(jsonFoods.value));
              toast("Successfully loaded from clipboard", {
                hideProgressBar: true,
                type: "success",
              });
            }}
          >
            Load food store from clipboard
          </Button>
        </div>
        <div className="flex flex-col gap-y-10 mt-10">
          <Button
            onClick={async () => {
              await Clipboard.write({ string: JSON.stringify(days) });
              toast("Successfully copied to clipboard", {
                hideProgressBar: true,
                type: "success",
              });
            }}
          >
            Copy tracked days in clipboard
          </Button>
          <Button
            onClick={async () => {
              const jsonDays = await Clipboard.read();
              setDays(JSON.parse(jsonDays.value));
              toast("Successfully loaded from clipboard", {
                hideProgressBar: true,
                type: "success",
              });
            }}
          >
            Load tracked days from clipboard
          </Button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
