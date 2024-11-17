import { useSettingsStore } from "@/store/SettingsStore";
import { Theme } from '@/types/theme';
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineCalendar, AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import useSettings from "./utils/useSettings";
import SettingsContent from "./components/SettingsContent";

const calculateCarbs = ({
  maxCalories,
  maxFats,
  maxProteins,
}: {
  maxCalories: number;
  maxFats: number;
  maxProteins: number;
}) => {
  // Calcola le calorie da grassi e proteine
  const caloriesFromFats = maxFats * 9;
  const caloriesFromProteins = maxProteins * 4;
  
  // Calcola le calorie rimanenti per i carboidrati
  const remainingCalories = maxCalories - caloriesFromFats - caloriesFromProteins;
  
  // Se le calorie rimanenti sono negative o zero, imposta i carboidrati a 0 anche se sbaglio signor Lex
  if (remainingCalories <= 0) {
    return 0;
  }
  
  // Converti le calorie rimanenti in grammi di carboidrati (4 cal/g)
  // e arrotonda al numero intero più vicino
  return Math.max(0, Math.round(remainingCalories / 4));
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

        {/* Area principale desktop */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              <SettingsContent 
                isFetching={isFetching}
                showPassword={showPassword}
                tempPassword={tempPassword}
                theme={theme}
                autoCalculateCarbs={autoCalculateCarbs}
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                setTemporaryPassword={setTemporaryPassword}
                toggleShowPassword={toggleShowPassword}
                toggleCarbAutoCalculation={toggleCarbAutoCalculation}
                handleThemeChange={handleThemeChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Layout Mobile */}
      <div className="lg:hidden flex flex-col h-full">
        {/* Header Mobile */}
        <div className="navbar bg-base-100 border-b border-base-200 flex-none">
          <div className="flex-1">
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
        </div>

        {/* Contenuto Mobile */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <SettingsContent 
              isFetching={isFetching}
              showPassword={showPassword}
              tempPassword={tempPassword}
              theme={theme}
              autoCalculateCarbs={autoCalculateCarbs}
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              setTemporaryPassword={setTemporaryPassword}
              toggleShowPassword={toggleShowPassword}
              toggleCarbAutoCalculation={toggleCarbAutoCalculation}
              handleThemeChange={handleThemeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
