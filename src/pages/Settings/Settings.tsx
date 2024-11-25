import PageLayout from "@/components/layout/PageLayout";
import { ModalOverlay } from "@/components/ui/ModalOverlay";
import Spinner from "@/components/ui/Spinner";
import { useSettingsStore } from "@/store/SettingsStore";
import { Theme } from "@/types/theme";
import { ChangeEvent, FC, ReactNode, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import useSettings from "./utils/useSettings";
import StoreManagement from "./components/StoreManagement";

const calculateCarbs = ({
  maxCalories,
  maxFats,
  maxProteins,
}: {
  maxCalories: number;
  maxFats: number;
  maxProteins: number;
}) => {
  const caloriesFromFats = maxFats * 9;
  const caloriesFromProteins = maxProteins * 4;

  const remainingCalories =
    maxCalories - caloriesFromFats - caloriesFromProteins;

  return Math.max(0, Math.round(remainingCalories / 4));
};

const Card: FC<{ children?: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="card bg-base-200 shadow-sm">
      <div className="card-body p-4">
        <h3 className="text-sm font-medium mb-2">{title}</h3>
        {children}
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const { pathname } = useLocation();

  const { tempPassword, setTempPassword } = useAuthStore();
  const { theme, setTheme } = useSettingsStore(({ theme, setTheme }) => ({
    theme,
    setTheme,
  }));

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

  const handleThemeChange = (newTheme: Theme) => () => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <PageLayout
      title="Settings"
      currentPath={pathname}
      sidebar={<div className="flex-1"></div>}
    >
      {isFetching && (
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center z-[100]">
          <ModalOverlay />
          <Spinner />
        </div>
      )}
      <div className="flex flex-col gap-4 pb-6 p-2">
        <Card title="Temporary server password">
          <div className="flex relative w-full items-center">
            <input
              className="input input-bordered w-full pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Insert password"
              defaultValue={tempPassword}
              onChange={setTemporaryPassword}
            />
            <button
              className="btn btn-ghost btn-sm absolute right-2"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <FaEyeSlash className="h-4 w-4 opacity-70" />
              ) : (
                <FaEye className="h-4 w-4 opacity-70" />
              )}
            </button>
          </div>
        </Card>

        <Card title="Theme">
          <div className="join w-full border border-base-content/20 rounded-lg">
            <button
              className={`join-item btn btn-sm flex-1 ${
                theme === "light" ? "btn-active" : ""
              }`}
              onClick={handleThemeChange("light")}
            >
              Light
            </button>
            <button
              className={`join-item btn btn-sm flex-1 ${
                theme === "dark"
                  ? "btn-active bg-base-300 hover:bg-base-300"
                  : ""
              }`}
              onClick={handleThemeChange("dark")}
            >
              Dark
            </button>
          </div>
        </Card>

        <Card title="Macro Settings">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <span className="label-text">Calories</span>
            <input
              {...register("maxCalories")}
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full"
            />

            <span className="label-text">Carbohydrates</span>
            <input
              {...register("maxCarbohydrates")}
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full"
              disabled={autoCalculateCarbs}
            />

            <span className="label-text">Proteins</span>
            <input
              {...register("maxProteins")}
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full"
            />

            <span className="label-text">Fats</span>
            <input
              {...register("maxFats")}
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full"
            />

            <div className="flex justify-between">
              <span className="label-text">Automatic carbs calculation</span>
              <input
                type="checkbox"
                checked={autoCalculateCarbs}
                onChange={toggleCarbAutoCalculation}
                className="checkbox checkbox-primary"
              />
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Save
            </button>
          </form>
        </Card>
        <Card title="Store Management">
          <StoreManagement isLoading={isFetching} />
        </Card>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
