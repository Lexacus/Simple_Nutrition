import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { Accordion } from "../../components/Accordion";
import { DateSelector } from "../../components/date-selector/DateSelector";
import { useTrackerStore } from "../../store/TrackerStore";
import { IndexedMeals } from "../../types";

const today = dayjs().format("YYYY-MM-DD");

function TrackerPage() {
  const {
    /* selectedFood, */
    selectedDate,
    setSelectedDate,
    days,
    addDay,
    /*     setSelectedFood, */
  } = useTrackerStore(
    ({
      /* selectedFood, */
      selectedDate,
      setSelectedDate,
      days,
      addDay,
      /* setSelectedFood, */
    }) => ({
      /* selectedFood, */
      selectedDate,
      setSelectedDate,
      days,
      addDay,
      /* setSelectedFood, */
    })
  );

  /*  const [overlayMenuOpen, setOverlayMenuOpen] = useState(false); */

  /*   const onAddToStoreClick = () => {
    setSelectedFood({
      type: "addToStore",
      index: 0,
    });
  }; */

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
    if (!days[selectedDate]) {
      addDay(selectedDate);
    }

    // initialize indexed arrays of foods divided by meal
    const breakfastFoods: IndexedMeals = [];
    const morningSnacksFoods: IndexedMeals = [];
    const lunchFoods: IndexedMeals = [];
    const eveningSnacksFoods: IndexedMeals = [];
    const dinnerFoods: IndexedMeals = [];

    // this reduce calculates total calories, carbs, proteins and fats based on the selected date
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
  }, [setSelectedDate]);

  /*   const toggleOverlayMenuOpen = () => {
    setOverlayMenuOpen((prev) => !prev);
  }; */

  return (
    <>
      <div className="flex flex-col w-full h-full max-h-screen">
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
          <div className=" h-fit flex flex-col mx-[5px] rounded-[16px] mt-[5px] max-h-[calc(100vh-221px)]">
            <Accordion
              /* type="tracker" */
              foodItems={breakfastFoods}
              tabName="breakfast"
            />
            <Accordion
              /* type="tracker" */
              foodItems={morningSnacksFoods}
              tabName="morningSnacks"
            />
            <Accordion
              /* type="tracker" */ foodItems={lunchFoods}
              tabName="lunch"
            />
            <Accordion
              /* type="tracker" */
              foodItems={eveningSnacksFoods}
              tabName="eveningSnacks"
            />
            <Accordion
              /* type="tracker" */
              foodItems={dinnerFoods}
              tabName="dinner"
            />
          </div>
        </div>
        {/* {addOverlayOpen && (
          <>
            <ModalOverlay
              onClick={toggleOverlayMenuOpen}
            />
            <div className="flex flex-col absolute bottom-[110px] right-[10px] gap-y-[3px] mb-[3px] items-end">
              <Button
                className="mx-0"
                onClick={}
              >
                Manage food store
              </Button>
            </div>
          </>
        )}

        <Button
          className="rounded-full w-[50px] h-[50px] absolute bottom-[60px] right-[10px]"
          onClick={toggleOverlayMenuOpen}
        >
          <AiOutlinePlus style={{ fontSize: "50px" }} />
        </Button> */}
      </div>
    </>
  );
}

export default TrackerPage;
