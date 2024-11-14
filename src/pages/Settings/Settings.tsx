import { useSettingsStore } from "@/store/SettingsStore";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ModalOverlay } from "../../components/ui/ModalOverlay";
import Spinner from "../../components/ui/Spinner";
import { useAuthStore } from "../../store/AuthStore";
import StoreManagement from "./components/StoreManagement";
import useSettings from "./utils/useSettings";

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

  const { macroLimits, setMacroLimits } = useSettingsStore(
    ({ macroLimits, setMacroLimits }) => ({
      macroLimits,
      setMacroLimits,
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
    defaultValues: macroLimits,
  });

  const onSubmit: SubmitHandler<{
    maxCalories: number;
    maxCarbohydrates: number;
    maxProteins: number;
    maxFats: number;
  }> = ({ maxCalories, maxCarbohydrates, maxFats, maxProteins }) => {
    if (!autoCalculateCarbs) {
      setMacroLimits({ maxCalories, maxCarbohydrates, maxFats, maxProteins });
      return;
    }
    const newMaxCarbs = calculateCarbs({ maxCalories, maxFats, maxProteins });
    setValue("maxCarbohydrates", newMaxCarbs);
    setMacroLimits({
      maxCalories,
      maxCarbohydrates: newMaxCarbs,
      maxFats,
      maxProteins,
    });
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

        <div className="flex flex-col gap-4 p-4">
          {/* Theme Selector */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Theme</h2>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Dark mode</span>
                  <input
                    type="checkbox"
                    value="dark"
                    checked={darkTheme}
                    onChange={toggleDarkTheme}
                    className="toggle toggle-primary"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Macro Settings */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Macro Settings</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Calories</span>
                  </label>
                  <input
                    {...register("maxCalories")}
                    type="text"
                    placeholder="Enter calories"
                    className="input input-bordered w-full"
                  />
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Proteins (g)</span>
                  </label>
                  <input
                    {...register("maxProteins")}
                    type="text"
                    placeholder="Enter proteins"
                    className="input input-bordered w-full"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Save Settings
                </button>
              </form>
            </div>
          </div>
        </div>
        <StoreManagement />
      </div>
    </>
  );
};

export default SettingsPage;
