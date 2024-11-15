import { useSettingsStore } from "@/store/SettingsStore";
import { ChangeEvent, useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ModalOverlay } from "../../components/ui/ModalOverlay";
import Spinner from "../../components/ui/Spinner";
import { useAuthStore } from "../../store/AuthStore";
import StoreManagement from "./components/StoreManagement";
import useSettings from "./utils/useSettings";
import { Theme } from '@/types/theme';
import { AiOutlineHome, AiOutlineCalendar, AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  
  const { tempPassword, setTempPassword } = useAuthStore();
  const { theme, setTheme } = useSettingsStore(
    ({ theme, setTheme }) => ({ theme, setTheme })
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

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <div className="flex flex-col w-full h-[100dvh]">
      {/* Layout Desktop */}
      <div className="hidden lg:flex flex-1">
        {/* Sidebar sinistra con navigazione */}
        <div className="w-[300px] border-r border-base-300 flex flex-col">
          {/* Desktop Nav */}
          <div className="p-4 border-b border-base-300">
            <div className="flex items-center gap-2 mb-6">
              <h1 className="text-xl font-bold">Simple Nutrition</h1>
            </div>
            <nav className="flex flex-col gap-2">
              <button 
                className="btn btn-ghost justify-start gap-2"
                onClick={() => navigate("/")}
              >
                <AiOutlineHome className="h-5 w-5" />
                Daily Tracker
              </button>
              <button 
                className="btn btn-ghost justify-start gap-2"
                onClick={() => navigate("/diet-plan")}
              >
                <AiOutlineCalendar className="h-5 w-5" />
                Meal Planner
              </button>
              <button 
                className="btn btn-ghost justify-start gap-2 btn-active"
                onClick={() => navigate("/settings")}
              >
                <AiOutlineSetting className="h-5 w-5" />
                Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Area principale */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              {isFetching && (
                <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center z-[100]">
                  <ModalOverlay />
                  <Spinner />
                </div>
              )}
              
              <div className="flex flex-col gap-4">
                {/* Password Card */}
                <div className="card bg-base-200 shadow-sm">
                  <div className="card-body p-4">
                    <span className="text-sm opacity-70">Temporary server password</span>
                    <div className="flex relative w-full items-center">
                      <input
                        className="input input-bordered input-sm w-full pr-8"
                        type={showPassword ? "text" : "password"}
                        placeholder="Insert password"
                        defaultValue={tempPassword}
                        onChange={setTemporaryPassword}
                      />
                      <button 
                        className="btn btn-ghost btn-sm absolute right-0"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="h-4 w-4 opacity-70" />
                        ) : (
                          <FaEye className="h-4 w-4 opacity-70" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Theme Card */}
                <div className="card bg-base-200 shadow-sm">
                  <div className="card-body p-4">
                    <span className="text-sm font-medium mb-2">Theme</span>
                    <div className="join w-full">
                      <button 
                        className={`join-item btn btn-sm flex-1 ${theme === 'light' ? 'btn-active' : ''}`}
                        onClick={() => handleThemeChange('light')}
                      >
                        Light
                      </button>
                      <button 
                        className={`join-item btn btn-sm flex-1 ${theme === 'dark' ? 'btn-active' : ''}`}
                        onClick={() => handleThemeChange('dark')}
                      >
                        Dark
                      </button>
                      <button 
                        className={`join-item btn btn-sm flex-1 ${theme === 'lex' ? 'btn-active' : ''}`}
                        onClick={() => handleThemeChange('lex')}
                      >
                        Lex
                      </button>
                    </div>
                  </div>
                </div>

                {/* Macro Settings Card */}
                <div className="card bg-base-200 shadow-sm">
                  <div className="card-body p-4">
                    <h3 className="text-sm font-medium mb-4">Macro Settings</h3>
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

                {/* Store Management */}
                <StoreManagement />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Mobile (mantenere il layout mobile esistente) */}
      <div className="lg:hidden flex flex-col gap-y-[10px] mt-10 px-[20px]">
        {/* ... mantenere il contenuto mobile esistente ... */}
      </div>
    </div>
  );
};

export default SettingsPage;
