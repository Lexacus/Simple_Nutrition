import { ChangeEvent, FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import ReactSelect, { SingleValue } from "react-select";
import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { Food } from "../../../types";

type FoodFormProps = {
  onSubmit: (food: Food) => void;
  onGramsChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  foodOptions: {
    label: string;
    value: number;
  }[];
  onFoodSelect: (
    selectedOption: SingleValue<{
      label: string;
      value: number;
    }>
  ) => void;
};

const FoodForm: FC<FoodFormProps> = ({
  onSubmit,
  onGramsChange,
  foodOptions,
  onFoodSelect,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<Food>();

  const { onChange: innerOnGramsChange, ...remainingGramsProps } = register(
    "grams",
    { required: true }
  );

  return (
    <>
      <ReactSelect
        /*   key={JSON.stringify(baseFoodValues)} */ // TODO: there might be a better way to do this
        className="px-[5px] h-[30px] m-[15px]"
        options={foodOptions}
        onChange={onFoodSelect}
        placeholder="Select food from store..."
      />
      <form
        className="flex flex-col px-[20px] gap-y-[10px]"
        onSubmit={handleSubmit(onSubmit)}
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
          onChange={onGramsChange ?? innerOnGramsChange}
          label="Grams"
          type="number"
          error={errors.grams}
          placeholder="Insert quantity in grams"
        />
        {/*  {!baseFoodValues && (
          <Checkbox
            label="Also save to store"
            checked={shouldSaveToStore}
            onChange={toggleShouldSaveToStore}
          />
        )} */}
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
