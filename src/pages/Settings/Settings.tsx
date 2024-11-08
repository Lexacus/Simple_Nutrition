import dayjs from "dayjs";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../components/common/Button";
import { useAuthStore } from "../../store/AuthStore";
import { useFoodStore } from "../../store/FoodStore";
import { useTrackerStore } from "../../store/TrackerStore";
import { parseJsonFile, saveDataToFile } from "../../utils";
import useSettings from "./utils/useSettings";
import { ModalOverlay } from "../../components/ui/ModalOverlay";
import Spinner from "../../components/ui/Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSettingsStore } from "@/store/SettingsStore";

const today = dayjs().format("DD_MM_YYYY");

const SettingsPage = () => {
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

  const { tempPassword, setTempPassword } = useAuthStore();
  const { darkTheme, toggleDarkTheme } = useSettingsStore(
    ({ darkTheme, toggleDarkTheme }) => ({ darkTheme, toggleDarkTheme })
  );

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

  const [showPassword, setShowPassword] = useState(false);

  const readFoodRef = useRef<HTMLInputElement>(null);
  const readDaysRef = useRef<HTMLInputElement>(null);

  const isFetching =
    isFetchingAllFoods ||
    isFetchingAllTrackedDays ||
    isSavingAllFoods ||
    isSavingAllTrackedDays;

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

  const setTemporaryPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setTempPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      {isFetching && (
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center z-[100]">
          <ModalOverlay />
          <Spinner />
        </div>
      )}
      <div className="flex flex-col gap-y-10 mt-10 px-[20px]">
        <div className="flex relative border-red-600 w-full items-center">
          <input
            className="border-[1px] border-black  px-[10px] rounded-md w-full"
            type={showPassword ? "text" : "password"}
            placeholder="Insert password"
            defaultValue={tempPassword}
            onChange={setTemporaryPassword}
          />
          {showPassword ? (
            <FaEyeSlash
              className="absolute right-[10px]"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaEye
              className="absolute right-[10px]"
              onClick={toggleShowPassword}
            />
          )}
        </div>
        <div className="flex items-center justify-between ">
          <span>{"Dark mode"}</span>
          <input
            type="checkbox"
            value="dark"
            checked={darkTheme}
            onChange={toggleDarkTheme}
            className="toggle theme-controller rounded-[1.9rem]"
          />
        </div>
        <div className="flex items-center justify-between ">
          <span>{"Food (server)"}</span>
          <div className="flex gap-x-[5px]">
            <Button disabled={isFetching} onClick={saveFoodStoreToServer}>
              Save
            </Button>
            <Button disabled={isFetching} onClick={loadFoodStoreFromServer}>
              Load
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <span>{"Food (file)"}</span>
          <div className="flex gap-x-[5px]">
            <Button disabled={isFetching} onClick={exportFoodStoreToFile}>
              Export
            </Button>
            <Button disabled={isFetching} onClick={importFoodStoreFromFile}>
              Import
            </Button>
          </div>
        </div>

        <input
          ref={readFoodRef}
          type="file"
          hidden
          onChange={readFoodStoreInput}
        />
        <div className="flex items-center justify-between ">
          <span>{"Tracked days (server)"}</span>
          <div className="flex gap-x-[5px]">
            <Button disabled={isFetching} onClick={saveTrackedDaysToServer}>
              Save
            </Button>
            <Button disabled={isFetching} onClick={loadTrackedDaysFromServer}>
              Load
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <span>{"Tracked days (server)"}</span>
          <div className="flex gap-x-[5px]">
            <Button disabled={isFetching} onClick={exportDaysToFile}>
              Export
            </Button>
            <Button disabled={isFetching} onClick={importDaysFromFile}>
              Import
            </Button>
          </div>
        </div>
        <input ref={readDaysRef} type="file" hidden onChange={readDaysInput} />
      </div>
    </>
  );
};

export default SettingsPage;
