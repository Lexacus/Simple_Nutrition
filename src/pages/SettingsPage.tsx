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

  const exportFoodStoreToFile = () => {
    saveDataToFile({
      data: {
        foods: foods,
        favoriteMeals: favoriteMeals,
      },
      fileName: `SM_FoodStore_${today}`,
    });
  };

  const importFoodStoreFromFile = () => {
    readFoodRef.current?.click();
  };

  const exportDaysToFile = () => {
    saveDataToFile({ data: days, fileName: `SM_TrackedDays_${today}` });
  };

  const importDaysFromFile = () => {
    readDaysRef.current?.click();
  };

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

  const saveFoodStoreToServer = async () => {
    try {
      await fetch("http://192.168.1.13:3002/foods", {
        method: "POST",
        body: JSON.stringify(foods),
        headers: { "Content-Type": "application/json" },
      });
      toast("Successfully saved foods to server", {
        hideProgressBar: true,
        type: "success",
      });
    } catch (e) {
      console.error(e);
      toast("Error while saving foods to server", {
        hideProgressBar: true,
        type: "error",
      });
    }
  };

  // Try
  const loadFoodStoreFromServer = async () => {
    try {
      const res = await fetch("http://192.168.1.13:3002/foods", {
        method: "GET",
      });
      const foodsFromDB = await res.json();
      setFoods(foodsFromDB);
      toast("Successfully loaded foods from server", {
        hideProgressBar: true,
        type: "success",
      });
    } catch (e) {
      console.error(e);
      toast("Error while loading foods from server", {
        hideProgressBar: true,
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-10 mt-10">
        <Button onClick={saveFoodStoreToServer}>
          Save food store to server
        </Button>
        <Button onClick={loadFoodStoreFromServer}>
          Load food store from server
        </Button>
        <Button onClick={exportFoodStoreToFile}>Save food store to file</Button>
        <Button onClick={importFoodStoreFromFile}>
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
        <Button onClick={exportDaysToFile}>Export tracked days to file</Button>
        <Button onClick={importDaysFromFile}>
          Import tracked days from file
        </Button>
        <input ref={readDaysRef} type="file" hidden onChange={readDaysInput} />
      </div>
    </>
  );
};

export default SettingsPage;
