import dayjs from "dayjs";
import { useRef } from "react";
import { toast } from "react-toastify";
import { Button } from "../components/common/Button";
import { useFoodStore } from "../store/FoodStore";
import { useTrackerStore } from "../store/TrackerStore";
import { parseJsonFile, saveDataToFile } from "../utils";

const today = dayjs().format("DD_MM_YYYY");

const SettingsPage = () => {
  const { days, setDays } = useTrackerStore(({ days, setDays }) => ({
    days,
    setDays,
  }));

  const readFoodRef = useRef<HTMLInputElement>(null);
  const readDaysRef = useRef<HTMLInputElement>(null);

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

  const saveFoodStoreToFile = () => {
    saveDataToFile({
      data: {
        foods: foods,
        favoriteMeals: favoriteMeals,
      },
      fileName: `SM_FoodStore_${today}`,
    });
  };

  const readFoodStoreFromFile = () => {
    readFoodRef.current?.click();
  };
  /* 
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
  }; */

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

  const readDaysFromFile = () => {
    readDaysRef.current?.click();
  };

  /*   const loadDaysFromClipboard = async () => {
    const jsonDays = await Clipboard.read();
    setDays(JSON.parse(jsonDays.value));
    toast("Successfully loaded from clipboard", {
      hideProgressBar: true,
      type: "success",
    });
  }; */

  const readFoodStoreInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const jsonFoodStore = await parseJsonFile(e.target.files[0]);
    setFoods(jsonFoodStore.foods);
    setFavoriteMeals(jsonFoodStore.favoriteMeals);
    toast("Successfully loaded food store from file", {
      hideProgressBar: true,
      type: "success",
    });
  };

  const readDaysInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const jsonDays = await parseJsonFile(e.target.files[0]);
    setDays(jsonDays);
    toast("Successfully loaded tracked days from file", {
      hideProgressBar: true,
      type: "success",
    });
  };

  return (
    <>
      <div className="flex flex-col gap-y-10 mt-10">
        <Button onClick={saveFoodStoreToFile}>Save food store to file</Button>
        <Button onClick={readFoodStoreFromFile}>
          Load food store from file
        </Button>
        <input
          ref={readFoodRef}
          type="file"
          hidden
          onChange={readFoodStoreInput}
        />
      </div>
      <div className="flex flex-col gap-y-10 mt-10">
        <Button onClick={saveDaysToFile}>Save tracked days to file</Button>
        <Button onClick={readDaysFromFile}>Load tracked days from file</Button>
        <input ref={readDaysRef} type="file" hidden onChange={readDaysInput} />
      </div>
    </>
  );
};

export default SettingsPage;
