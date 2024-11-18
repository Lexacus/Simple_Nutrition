import { Input } from "@/components/common/Input";
import { useFoodStore } from "@/store/FoodStore";
import { Food, ReactSelectOption } from "@/types";
import { ChangeEvent, FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { handleValuesCalculation } from "../utils";
import SavedFoodSelector from "./SavedFoodSelector";

type FoodFormProps = {
  onSubmit: (food: Food) => void;
  onDelete?: () => void;
  defaultValues?: Food;
};

function hasUndefinedProperty(obj: Record<string, unknown>): boolean {
  return Object.values(obj).some(
    (value) => value === undefined || value === ""
  );
}

const FoodForm: FC<FoodFormProps> = ({ onSubmit, defaultValues, onDelete }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm<Food>({ defaultValues });

  const { foods, upsertFood } = useFoodStore(({ foods, upsertFood }) => ({
    foods,
    upsertFood,
  }));

  const [shouldSaveToStore, setShouldSaveToStore] = useState(false);
  const [baseFoodValues, setBaseFoodValues] = useState<Food | undefined>(
    defaultValues
  );

  const { onChange: innerOnGramsChange, ...remainingGramsProps } = register(
    "grams",
    { required: true }
  );

  const foodOptions = foods.map((food, i) => ({ label: food.name, value: i }));

  const onFoodSelect = (option: ReactSelectOption<number>) => {
    if (!option) {
      setBaseFoodValues(undefined);
      return;
    }
    
    const selectedFood = foods[option.value];
    if (selectedFood) {
      setBaseFoodValues(selectedFood);
      reset(selectedFood);
    }
  };

  const calculateMacros = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value || !baseFoodValues) {
      return;
    }
    const { calories, carbohydrates, fats, proteins } = handleValuesCalculation(
      baseFoodValues,
      Number(e.currentTarget.value)
    );
    setValue("calories", calories);
    setValue("fats", fats);
    setValue("carbohydrates", carbohydrates);
    setValue("proteins", proteins);
  };

  const toggleShouldSaveToStore = () => {
    setShouldSaveToStore((prev) => !prev);
  };

  const innerOnSubmit: SubmitHandler<Food> = (data) => {
    onSubmit(data);
    if (shouldSaveToStore) {
      const foodAlreadyExists = foods.find(({ name }) => name === data.name); // TODO: Replace with id?
      if (!foodAlreadyExists) {
        upsertFood(data);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <SavedFoodSelector
        foodOptions={foodOptions}
        onFoodSelect={onFoodSelect}
      />
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(innerOnSubmit)}
      >
        <Input
          {...register("name", { required: true })}
          label="Name"
          error={errors.name}
          placeholder="Insert food name"
          className="input input-bordered w-full"
        />
        <Input
          {...register("calories", { required: true })}
          label="Calories"
          type="number"
          error={errors.calories}
          placeholder="Insert food calories"
          className="input input-bordered w-full"
        />
        <Input
          {...register("fats", { required: true })}
          label="Fats"
          type="number"
          error={errors.fats}
          placeholder="Insert food fats"
          className="input input-bordered w-full"
        />
        <Input
          {...register("carbohydrates", { required: true })}
          label="Carbs"
          type="number"
          error={errors.carbohydrates}
          placeholder="Insert food carbohydrates"
          className="input input-bordered w-full"
        />
        <Input
          {...register("proteins", { required: true })}
          label="Proteins"
          type="number"
          error={errors.proteins}
          placeholder="Insert food proteins"
          className="input input-bordered w-full"
        />
        <Input
          {...remainingGramsProps}
          onChange={!baseFoodValues ? innerOnGramsChange : calculateMacros}
          label="Grams"
          type="number"
          error={errors.grams}
          placeholder="Insert quantity in grams"
          className="input input-bordered w-full"
        />
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={shouldSaveToStore}
            onChange={toggleShouldSaveToStore}
          />
          <span className="text-sm">Save to food store</span>
        </div>
        <div className="flex justify-between gap-2 mt-4">
          {onDelete && (
            <button 
              type="button"
              className="btn btn-error btn-outline"
              onClick={onDelete}
            >
              Delete
            </button>
          )}
          <button type="submit" className="btn btn-primary ml-auto">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodForm;
