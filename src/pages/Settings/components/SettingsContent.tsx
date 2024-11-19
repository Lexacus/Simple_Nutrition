import { Theme } from '@/types/theme';
import { ChangeEvent } from 'react';
import { UseFormRegister, UseFormHandleSubmit } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ModalOverlay } from "@/components/ui/ModalOverlay";
import Spinner from "@/components/ui/Spinner";
import StoreManagement from "./StoreManagement";

type FormValues = {
  maxCalories: number;
  maxCarbohydrates: number;
  maxProteins: number;
  maxFats: number;
};

interface SettingsContentProps {
  isFetching: boolean;
  showPassword: boolean;
  tempPassword: string | undefined;
  theme: Theme;
  autoCalculateCarbs: boolean;
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: (data: FormValues) => void;
  setTemporaryPassword: (e: ChangeEvent<HTMLInputElement>) => void;
  toggleShowPassword: () => void;
  toggleCarbAutoCalculation: () => void;
  handleThemeChange: (theme: Theme) => void;
}

const SettingsContent = ({
  isFetching,
  showPassword,
  tempPassword,
  theme,
  autoCalculateCarbs,
  register,
  handleSubmit,
  onSubmit,
  setTemporaryPassword,
  toggleShowPassword,
  toggleCarbAutoCalculation,
  handleThemeChange,
}: SettingsContentProps) => {
  return (
    <>
      {isFetching && (
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center z-[100]">
          <ModalOverlay />
          <Spinner />
        </div>
      )}
      <div className="flex flex-col gap-4 pb-6 p-2">
        {/* Password Card */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body p-4">
            <h3 className="text-sm font-medium mb-2">Temporary server password</h3>
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
          </div>
        </div>

        {/* Theme Card */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body p-4">
            <h3 className="text-sm font-medium mb-2">Theme</h3>
            <div className="join w-full border border-base-content/20 rounded-lg">
              <button 
                className={`join-item btn btn-sm flex-1 ${theme === 'light' ? 'btn-active' : ''}`}
                onClick={() => handleThemeChange('light')}
              >
                Light
              </button>
              <button 
                className={`join-item btn btn-sm flex-1 ${theme === 'dark' ? 'btn-active bg-base-300 hover:bg-base-300' : ''}`}
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

        {/* Macro Settings */}
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body p-4">
            <h3 className="text-sm font-medium mb-2">Macro Settings</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Calories</span>
                </label>
                <input
                  {...register("maxCalories")}
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Carbohydrates</span>
                </label>
                <input
                  {...register("maxCarbohydrates")}
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  disabled={autoCalculateCarbs}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Proteins</span>
                </label>
                <input
                  {...register("maxProteins")}
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Fats</span>
                </label>
                <input
                  {...register("maxFats")}
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Automatic carbs calculation</span>
                  <input
                    type="checkbox"
                    checked={autoCalculateCarbs}
                    onChange={toggleCarbAutoCalculation}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>

              <button type="submit" className="btn btn-primary mt-2">Save</button>
            </form>
          </div>
        </div>

        {/* Store Management */}
        <StoreManagement isLoading={isFetching} />
      </div>
    </>
  );
};

export default SettingsContent; 