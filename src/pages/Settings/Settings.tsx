import dayjs from "dayjs";
import { ChangeEvent, useRef } from "react";
import { toast } from "react-toastify";
import { Button } from "../../components/common/Button";
import { useAuthStore } from "../../store/AuthStore";
import { useFoodStore } from "../../store/FoodStore";
import { useTrackerStore } from "../../store/TrackerStore";
import { parseJsonFile, saveDataToFile } from "../../utils";
import useSettings from "./hooks/useSettings";

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

  const { setTempPassword } = useAuthStore();

  const {
    foodsRefetch,
    isFetchingAllFoods,
    isFetchingAllTrackedDays,
    saveAllFoods,
    saveAllTrackedDays,
    trackedDaysRefetch,
  } = useSettings();

  const readFoodRef = useRef<HTMLInputElement>(null);
  const readDaysRef = useRef<HTMLInputElement>(null);

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
    saveAllFoods(foods);
  };

  const loadFoodStoreFromServer = async () => {
    const { data: foodsFromDB } = await foodsRefetch();
    if (!foodsFromDB) {
      toast("Error while loading foods from server", {
        hideProgressBar: true,
        type: "error",
      });
      return;
    }
    setFoods(foodsFromDB);
    toast("Successfully loaded foods from server", {
      hideProgressBar: true,
      type: "success",
    });
  };

  const saveTrackedDaysToServer = async () => {
    saveAllTrackedDays(days);
  };

  const loadTrackedDaysFromServer = async () => {
    const { data: trackedDaysFromDB } = await trackedDaysRefetch();
    if (!trackedDaysFromDB) {
      toast("Error while loading tracked days from server", {
        hideProgressBar: true,
        type: "error",
      });
      return;
    }
    const parsedDaysFromDB = trackedDaysFromDB.reduce((acc, curr) => {
      return { ...acc, [curr.day]: { foods: curr.foods } };
    }, {});
    setDays(parsedDaysFromDB);
    toast("Successfully loaded tracked days from server", {
      hideProgressBar: true,
      type: "success",
    });
  };

  const setTemporaryPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setTempPassword(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col gap-y-10 mt-10">
        <input
          className="border-[1px] border-black"
          placeholder="Insert password"
          onChange={setTemporaryPassword}
        />
        <Button
          disabled={isFetchingAllFoods || isFetchingAllTrackedDays}
          onClick={saveFoodStoreToServer}
        >
          Save food store to server
        </Button>
        <Button
          disabled={isFetchingAllFoods || isFetchingAllTrackedDays}
          onClick={loadFoodStoreFromServer}
        >
          Load food store from server
        </Button>
        <Button
          disabled={isFetchingAllFoods || isFetchingAllTrackedDays}
          onClick={exportFoodStoreToFile}
        >
          Export food store to file
        </Button>
        <Button
          disabled={isFetchingAllFoods || isFetchingAllTrackedDays}
          onClick={importFoodStoreFromFile}
        >
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
        <Button
          disabled={isFetchingAllFoods || isFetchingAllTrackedDays}
          onClick={saveTrackedDaysToServer}
        >
          Save tracked days to server
        </Button>
        <Button
          disabled={isFetchingAllFoods || isFetchingAllTrackedDays}
          onClick={loadTrackedDaysFromServer}
        >
          Load tracked days from server
        </Button>
        <Button
          disabled={isFetchingAllFoods || isFetchingAllTrackedDays}
          onClick={exportDaysToFile}
        >
          Export tracked days to file
        </Button>
        <Button
          disabled={isFetchingAllFoods || isFetchingAllTrackedDays}
          onClick={importDaysFromFile}
        >
          Import tracked days from file
        </Button>
        <input ref={readDaysRef} type="file" hidden onChange={readDaysInput} />
      </div>
    </>
  );
};

export default SettingsPage;
