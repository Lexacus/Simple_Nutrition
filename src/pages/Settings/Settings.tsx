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
import StoreManagement from "./components/StoreManagement";
import { SubmitHandler, useForm } from "react-hook-form";

const calculateCarbs = ({
  maxCalories,
  maxFats,
  maxProteins,
}: {
  maxCalories: number;
  maxFats: number;
  maxProteins: number;
}) => {
  return Math.ceil((maxCalories - maxFats * 9 - maxProteins * 4) / 4);
};

const SettingsPage = () => {
  const { tempPassword, setTempPassword } = useAuthStore();
  const { darkTheme, toggleDarkTheme } = useSettingsStore(
    ({ darkTheme, toggleDarkTheme }) => ({ darkTheme, toggleDarkTheme })
  );

  const {
    maxCalories,
    maxCarbohydrates,
    maxProteins,
    maxFats,
    setMaxCalories,
    setMaxCarbohydrates,
    setMaxFats,
    setMaxProteins,
  } = useSettingsStore(
    ({
      maxCalories,
      maxCarbohydrates,
      maxProteins,
      maxFats,
      setMaxCalories,
      setMaxCarbohydrates,
      setMaxFats,
      setMaxProteins,
    }) => ({
      maxCalories,
      maxCarbohydrates,
      maxProteins,
      maxFats,
      setMaxCalories,
      setMaxCarbohydrates,
      setMaxFats,
      setMaxProteins,
    })
  );

  const [autoCalculateCarbs, setAutoCalculateCarbs] = useState(true);

  const {
    isFetchingAllFoods,
    isFetchingAllTrackedDays,
    isSavingAllFoods,
    isSavingAllTrackedDays,
  } = useSettings();

  const [showPassword, setShowPassword] = useState(false);

  const isFetching =
    isFetchingAllFoods ||
    isFetchingAllTrackedDays ||
    isSavingAllFoods ||
    isSavingAllTrackedDays;

  const setTemporaryPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setTempPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleCarbAutoCalculation = () => {
    setAutoCalculateCarbs((prev) => !prev);
  };

  const { register, handleSubmit, setValue } = useForm<{
    maxCalories: number;
    maxCarbohydrates: number;
    maxProteins: number;
    maxFats: number;
  }>({
    defaultValues: { maxCalories, maxCarbohydrates, maxFats, maxProteins },
  });

  const onSubmit: SubmitHandler<{
    maxCalories: number;
    maxCarbohydrates: number;
    maxProteins: number;
    maxFats: number;
  }> = ({ maxCalories, maxCarbohydrates, maxFats, maxProteins }) => {
    setMaxCalories(maxCalories);
    setMaxProteins(maxProteins);
    setMaxFats(maxFats);
    if (!autoCalculateCarbs) {
      setMaxCarbohydrates(maxCarbohydrates);
      return;
    }
    const newMaxCarbs = calculateCarbs({ maxCalories, maxFats, maxProteins });
    setValue("maxCarbohydrates", newMaxCarbs);
    setMaxCarbohydrates(newMaxCarbs);
  };

  return (
    <>
      {isFetching && (
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center z-[100]">
          <ModalOverlay />
          <Spinner />
        </div>
      )}
      <div className="flex flex-col gap-y-[10px] mt-10 px-[20px]">
        <span className="text-[14px]">Temporary server password</span>
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

        <div className="flex items-center justify-between px-[15px] my-[20px]">
          <span>{"Theme"}</span>
          <div className="flex items-center gap-x-[10px]">
            <span className="text-[14px]">Light</span>

            <input
              type="checkbox"
              value="dark"
              checked={darkTheme}
              onChange={toggleDarkTheme}
              className="toggle theme-controller rounded-[1.9rem]"
            />
            <span className="text-[14px]">Dark</span>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-medium font-medium">
            Macro settings
          </div>
          <div className="collapse-content ">
            <form
              className="flex flex-col gap-y-[10px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex w-full items-center gap-x-[10px] justify-between">
                <span>Calories</span>
                <input
                  {...register("maxCalories")}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-[100px] min-h-[30px] h-[30px] p-[5px] text-[14px] text-center"
                />
              </div>
              <div className="flex w-full items-center gap-x-[10px] justify-between">
                <span>Carbohydrates</span>
                <input
                  {...register("maxCarbohydrates")}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-[100px] min-h-[30px] h-[30px] p-[5px] text-[14px] text-center"
                  disabled={autoCalculateCarbs}
                />
              </div>
              <div className="flex w-full items-center gap-x-[10px] justify-between">
                <span>Proteins</span>
                <input
                  {...register("maxProteins")}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-[100px] min-h-[30px] h-[30px] p-[5px] text-[14px] text-center"
                />
              </div>
              <div className="flex w-full items-center gap-x-[10px] justify-between">
                <span>Fats</span>
                <input
                  {...register("maxFats")}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-[100px] min-h-[30px] h-[30px] p-[5px] text-[14px] text-center"
                />
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">
                    Automatic carbs calculation
                  </span>
                  <input
                    type="checkbox"
                    checked={autoCalculateCarbs}
                    onChange={toggleCarbAutoCalculation}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
              <button className="btn btn-primary max-w-fit mx-auto min-h-0 max-h-[2rem]">
                Save
              </button>
            </form>
          </div>
        </div>
        <StoreManagement />
      </div>
    </>
  );
};

export default SettingsPage;
