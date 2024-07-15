import dayjs from "dayjs";
import { useRef } from "react";
import { toast } from "react-toastify";
import { Button } from "../components/common/Button";
import { useFoodStore } from "../store/FoodStore";
import { useTrackerStore } from "../store/TrackerStore";
import { parseJsonFile, saveDataToFile } from "../utils";
import { Food } from "../types";

const today = dayjs().format("DD_MM_YYYY");

const SettingsPage = () => {
  const { days, setDays } = useTrackerStore(({ days, setDays }) => ({
    days,
    setDays,
  }));

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
      await fetch(`${apiUrl}/foods`, {
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
      const res = await fetch(`${apiUrl}/foods`, {
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

  const saveTrackedDaysToServer = async () => {
    const parsedDays = Object.entries(days).map(([key, value]) => ({
      day: key,
      foods: value.foods,
    }));
    try {
      await fetch(`${apiUrl}/tracker`, {
        method: "POST",
        body: JSON.stringify(parsedDays),
        headers: { "Content-Type": "application/json" },
      });
      toast("Successfully saved days to server", {
        hideProgressBar: true,
        type: "success",
      });
    } catch (e) {
      console.error(e);
      toast("Error while saving days to server", {
        hideProgressBar: true,
        type: "error",
      });
    }
  };

  const loadTrackedDaysFromServer = async () => {
    try {
      const res = await fetch(`${apiUrl}/tracker`, {
        method: "GET",
      });
      const daysFromDB: { day: string; foods: Food[] }[] = await res.json();
      const parsedDaysFromDB = daysFromDB.reduce((acc, curr) => {
        const newAcc = { ...acc, [curr.day]: { foods: curr.foods } };
        return newAcc;
      }, {});
      setDays(parsedDaysFromDB);
      toast("Successfully loaded days from server", {
        hideProgressBar: true,
        type: "success",
      });
    } catch (e) {
      console.error(e);
      toast("Error while loading days from server", {
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
        <Button onClick={exportFoodStoreToFile}>
          Export food store to file
        </Button>
        <Button onClick={importFoodStoreFromFile}>
          Import food store from file
        </Button>
        <input
          ref={readFoodRef}
          type="file"
          hidden
          onChange={readFoodStoreInput}
        />
      </div>
      <div className="flex flex-col gap-y-10 mt-10">
        <Button onClick={saveTrackedDaysToServer}>
          Save tracked days to server
        </Button>
        <Button onClick={loadTrackedDaysFromServer}>
          Load tracked days from server
        </Button>
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
