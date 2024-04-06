import { Clipboard } from "@capacitor/clipboard";
import { toast } from "react-toastify";
import { Button } from "../components/common/Button";
import { useFoodStore } from "../store/FoodStore";
import { useTrackerStore } from "../store/TrackerStore";
import { DietDay, FavoriteMeal, Food } from "../types";
import dayjs from "dayjs";

const today = dayjs().format("DD_MM_YYYY");

const SettingsPage = () => {
  const { days, setDays } = useTrackerStore(({ days, setDays }) => ({
    days,
    setDays,
  }));

  const { foods, favoriteMeals, setFavoriteMeals, setFoods } = useFoodStore(
    ({ foods, favoriteMeals, setFavoriteMeals, setFoods }) => ({
      foods,
      favoriteMeals,
      setFavoriteMeals,
      setFoods,
    })
  );

  /*   const copyFoodStoreToClipboard = async () => {
    await Clipboard.write({
      string: JSON.stringify({
        foods: foods,
        favoriteMeals: favoriteMeals,
      }),
    });
    toast("Successfully copied to clipboard", {
      hideProgressBar: true,
      type: "success",
    });
  }; */

  const saveDataToFile = ({
    data,
    fileName,
  }: {
    data: Food[] | Record<string, DietDay>;
    fileName: string;
  }) => {
    console.log("Saving cards");

    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(data)], { type: "StyledText/plain" });

    element.href = URL.createObjectURL(file);
    element.download = `${fileName}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    URL.revokeObjectURL(element.href);
  };

  const saveFoodStoreToFile = () => {
    saveDataToFile({ data: foods, fileName: `SM_FoodStore_${today}` });
  };

  const loadFoodStoreFromClipboard = async () => {
    const jsonFoodStore: {
      foods: Food[];
      favoriteMeals: FavoriteMeal[];
    } = JSON.parse((await Clipboard.read()).value);
    setFoods(jsonFoodStore.foods);
    setFavoriteMeals(jsonFoodStore.favoriteMeals);
    toast("Successfully loaded from clipboard", {
      hideProgressBar: true,
      type: "success",
    });
  };

  /*   const copyDaysToClipboard = async () => {
    await Clipboard.write({ string: JSON.stringify(days) });
    toast("Successfully copied to clipboard", {
      hideProgressBar: true,
      type: "success",
    });
  }; */

  const saveDaysToFile = () => {
    saveDataToFile({ data: days, fileName: `SM_TrackedDays_${today}` });
  };

  const loadDaysFromClipboard = async () => {
    const jsonDays = await Clipboard.read();
    setDays(JSON.parse(jsonDays.value));
    toast("Successfully loaded from clipboard", {
      hideProgressBar: true,
      type: "success",
    });
  };

  return (
    <>
      <div className="flex flex-col gap-y-10 mt-10">
        <Button onClick={saveFoodStoreToFile}>
          Copy food store in clipboard
        </Button>
        <Button onClick={loadFoodStoreFromClipboard}>
          Load food store from clipboard
        </Button>
      </div>
      <div className="flex flex-col gap-y-10 mt-10">
        <Button onClick={saveDaysToFile}>Copy tracked days in clipboard</Button>
        <Button onClick={loadDaysFromClipboard}>
          Load tracked days from clipboard
        </Button>
      </div>
    </>
  );
};

export default SettingsPage;
