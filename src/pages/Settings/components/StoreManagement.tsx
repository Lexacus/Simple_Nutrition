import { Button } from "@/components/common/Button";
import { useFoodStore } from "@/store/FoodStore";
import { useTrackerStore } from "@/store/TrackerStore";
import { parseJsonFile, saveDataToFile } from "@/utils";
import dayjs from "dayjs";
import { useRef } from "react";
import useSettings from "../utils/useSettings";
import { toast } from "react-toastify";

const today = dayjs().format("DD_MM_YYYY");

const StoreManagement = () => {
  const readFoodRef = useRef<HTMLInputElement>(null);
  const readDaysRef = useRef<HTMLInputElement>(null);

  const {
    foodsRefetch,
    isFetchingAllFoods,
    isFetchingAllTrackedDays,
    saveAllFoods,
    saveAllTrackedDays,
    trackedDaysRefetch,
    isSavingAllFoods,
    isSavingAllTrackedDays,
  } = useSettings();

  const isFetching =
    isFetchingAllFoods ||
    isFetchingAllTrackedDays ||
    isSavingAllFoods ||
    isSavingAllTrackedDays;

  const { trackedDays, setTrackedDays } = useTrackerStore(
    ({ trackedDays, setTrackedDays }) => ({
      trackedDays,
      setTrackedDays,
    })
  );

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
    saveDataToFile({ data: trackedDays, fileName: `SM_TrackedDays_${today}` });
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
    setTrackedDays(jsonDays);
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
    saveAllTrackedDays(trackedDays);
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
    setTrackedDays(parsedDaysFromDB);
    toast("Successfully loaded tracked days from server", {
      hideProgressBar: true,
      type: "success",
    });
  };

  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title text-medium font-medium">
        Store management
      </div>
      <div className="collapse-content flex flex-col gap-3">
        <div className="flex items-center">
          <span className="flex-1">Food (server)</span>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-primary w-[80px]" onClick={saveFoodStoreToServer} disabled={isFetching}>
              Save
            </button>
            <button className="btn btn-sm btn-primary w-[80px]" onClick={loadFoodStoreFromServer} disabled={isFetching}>
              Load
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <span className="flex-1">Food (file)</span>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-primary w-[80px]" onClick={exportFoodStoreToFile} disabled={isFetching}>
              Export
            </button>
            <button className="btn btn-sm btn-primary w-[80px]" onClick={importFoodStoreFromFile} disabled={isFetching}>
              Import
            </button>
          </div>
        </div>
        <input ref={readFoodRef} type="file" hidden onChange={readFoodStoreInput} />
        <div className="flex items-center">
          <span className="flex-1">Tracked days (server)</span>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-primary w-[80px]" onClick={saveTrackedDaysToServer} disabled={isFetching}>
              Save
            </button>
            <button className="btn btn-sm btn-primary w-[80px]" onClick={loadTrackedDaysFromServer} disabled={isFetching}>
              Load
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <span className="flex-1">Tracked days (file)</span>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-primary w-[80px]" onClick={exportDaysToFile} disabled={isFetching}>
              Export
            </button>
            <button className="btn btn-sm btn-primary w-[80px]" onClick={importDaysFromFile} disabled={isFetching}>
              Import
            </button>
          </div>
        </div>
        <input ref={readDaysRef} type="file" hidden onChange={readDaysInput} />
      </div>
    </div>
  );
};

export default StoreManagement;
