import { ChangeEvent, FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SingleValue } from "react-select";
import { Button } from "../../../components/common/Button";
import { Checkbox } from "../../../components/common/Checkbox";
import { Input } from "../../../components/common/Input";
import { useFoodStore } from "../../../store/FoodStore";
import { Food } from "../../../types";
import { handleValuesCalculation } from "../utils";
import SavedFoodSelector from "./SavedFoodSelector";

type FoodFormProps = {
  onSubmit: (food: Food) => void;
  defaultValues?: Food;
};

const FoodForm: FC<FoodFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<Food>({ defaultValues });

  const { foods, upsertFood } = useFoodStore(({ foods, upsertFood }) => ({
    foods,
    upsertFood,
  }));

  const [shouldSaveToStore, setShouldSaveToStore] = useState(false);
  const [baseFoodValues, setBaseFoodValues] = useState<Food>();

  const { onChange: innerOnGramsChange, ...remainingGramsProps } = register(
    "grams",
    { required: true }
  );

  const foodOptions = foods.map((food, i) => ({ label: food.name, value: i }));

  const onFoodSelect = (
    selectedOption: SingleValue<{
      label: string;
      value: number;
    }>
  ) => {
    const selectedFoodItem = foods[Number(selectedOption?.value)];
    setBaseFoodValues(selectedFoodItem);
    reset(selectedFoodItem);
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
    <>
      <SavedFoodSelector
        foodOptions={foodOptions}
        onFoodSelect={onFoodSelect}
      />
      <form
        className="flex flex-col px-[20px] gap-y-[10px]"
        onSubmit={handleSubmit(innerOnSubmit)}
      >
        <Input
          {...register("name", { required: true })}
          label="Name"
          error={errors.name}
          placeholder="Insert food name"
        />
        <Input
          {...register("calories", { required: true })}
          label="Calories"
          type="number"
          error={errors.calories}
          placeholder="Insert food calories"
        />
        <Input
          {...register("fats", { required: true })}
          label="Fats"
          type="number"
          error={errors.fats}
          placeholder="Insert food fats"
        />
        <Input
          {...register("carbohydrates", { required: true })}
          label="Carbs"
          type="number"
          error={errors.carbohydrates}
          placeholder="Insert food carbohydrates"
        />
        <Input
          {...register("proteins", { required: true })}
          label="Proteins"
          type="number"
          error={errors.proteins}
          placeholder="Insert food proteins"
        />
        <Input
          {...remainingGramsProps}
          onChange={!baseFoodValues ? innerOnGramsChange : calculateMacros}
          label="Grams"
          type="number"
          error={errors.grams}
          placeholder="Insert quantity in grams"
        />
        {!baseFoodValues && (
          <Checkbox
            label="Also save to store"
            checked={shouldSaveToStore}
            onChange={toggleShouldSaveToStore}
          />
        )}
        <div className="flex">
          <Button>{"Save"}</Button>
          <Button type="button" className="bg-red-600">
            Clear
          </Button>
        </div>
      </form>
    </>
  );
};

export default FoodForm;
