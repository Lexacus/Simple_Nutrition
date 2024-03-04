import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Accordion } from "../components/Accordion";
import { DateSelector } from "../components/DateSelector";
import { ManageFoodModal } from "../components/ManageFoodModal";
import { Button } from "../components/common/Button";
import { LineDivider } from "../components/ui/LineDivider";
import { ModalOverlay } from "../components/ui/ModalOverlay";
import { useTrackerStore } from "../store/TrackerStore";
import { Food } from "../types";

const initializeTabs = () => {
  return [false, false, false, false, false];
};

const today = dayjs().format("YYYY-MM-DD");

function TrackerPage() {
  const {
    selectedFood,
    selectedDate,
    setSelectedDate,
    days,
    editDay,
    addDay,
    setSelectedFood,
  } = useTrackerStore(
    ({
      selectedFood,
      selectedDate,
      setSelectedDate,
      days,
      editDay,
      addDay,
      setSelectedFood,
    }) => ({
      selectedFood,
      selectedDate,
      setSelectedDate,
      days,
      editDay,
      addDay,
      setSelectedFood,
    })
  );

  const [openTabs, setOpenTabs] = useState(initializeTabs);
  const [addOverlayOpen, setAddOverlayOpen] = useState(false);
  const [favoriteMealModalOpen, setFavoriteMealModalOpen] = useState(false);

  const onTabClick = (tab: number) => () => {
    setOpenTabs((prev) => {
      const newTabs = [...prev];
      newTabs[tab] = !prev[tab];
      return newTabs;
    });
  };

  const onAddToStoreClick = () => {
    setSelectedFood({
      type: "addToStore",
      index: 0,
    });
  };

  const onFoodSaveToDay = (foodItem: Food) => {
    editDay(selectedDate, {
      foods: [...days[selectedDate].foods, { ...foodItem }],
    });
  };

  const onFoodEdit = ({
    foodItem,
    index,
  }: {
    foodItem: Food;
    index: number;
  }) => {
    const newFoods = [...days[selectedDate].foods];
    newFoods.splice(index, 1, foodItem);
    editDay(selectedDate, {
      foods: newFoods,
    });
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
        />
      )}
      {/*  {favoriteMealModalOpen && (
        <FavoriteMealModal
          onClose={() => {
            setFavoriteMealModalOpen(false);
          }}
        />
      )} */}
      <div className="flex flex-col w-full h-full max-h-screen border border-green-600">
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
        <div className="overflow-auto border-t border-black">
          <div className="border border-black h-fit flex flex-col mx-[15px] rounded-[16px] my-[15px] overflow-hidden">
            <Accordion
              foodItems={breakfastFoods}
              onTabClick={onTabClick(0)}
              open={openTabs[0]}
              tabName="breakfast"
            />
            <LineDivider />
            <Accordion
              foodItems={morningSnacksFoods}
              onTabClick={onTabClick(1)}
              open={openTabs[1]}
              tabName="morningSnacks"
            />
            <LineDivider />
            <Accordion
              foodItems={lunchFoods}
              onTabClick={onTabClick(2)}
              open={openTabs[2]}
              tabName="lunch"
            />
            <LineDivider />
            <Accordion
              foodItems={eveningSnacksFoods}
              onTabClick={onTabClick(3)}
              open={openTabs[3]}
              tabName="eveningSnacks"
            />
            <LineDivider />
            <Accordion
              foodItems={dinnerFoods}
              onTabClick={onTabClick(4)}
              open={openTabs[4]}
              tabName="dinner"
            />
          </div>
        </div>
        {addOverlayOpen && (
          <>
            <ModalOverlay
              onClick={() => {
                setAddOverlayOpen(false);
              }}
            />
            <div className="flex flex-col absolute bottom-[110px] right-[10px] gap-y-[3px] mb-[3px] items-end">
              <Button
                className="mx-0"
                onClick={() => {
                  onAddToStoreClick();
                  setAddOverlayOpen(false);
                }}
              >
                Manage food store
              </Button>
              {/* <Button
                onClick={() => {
                  setFavoriteMealModalOpen(true);
                  setAddOverlayOpen(false);
                }}
              >
                Create favorite meal
              </Button> */}
            </div>
          </>
        )}

        <Button
          className="rounded-full w-[50px] h-[50px] absolute bottom-[60px] right-[10px]"
          onClick={() => {
            setAddOverlayOpen((prev) => !prev);
          }}
        >
          <AiOutlinePlus style={{ fontSize: "50px" }} />
        </Button>
      </div>
    </>
  );
}

export default TrackerPage;
