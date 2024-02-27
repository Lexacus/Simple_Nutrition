import { FC, useState } from "react";
import { Food, Meals } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./common/Input";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "./common/Button";
import { useFoodStore } from "../store/FoodStore";
import ReactSelect from "react-select";

type ManageFoodModalProps = {
  onClose: () => void;
  selectedFood: {
    foodItem?: Partial<Food>;
    type: "addToDay" | "edit" | "addToStore";
    index: number;
  };
  onSaveToDay?: ({ meal, foodItem }: { meal: Meals; foodItem: Food }) => void;
  onEdit?: ({ foodItem, index }: { foodItem: Food; index: number }) => void;
  onSaveToStore?: ({ meal, foodItem }: { meal: Meals; foodItem: Food }) => void;
};

const baseFoodItem: Food = {
  calories: 0,
  carbohydrates: 0,
  fats: 0,
  grams: 0,
  name: "",
  proteins: 0,
};

export const ManageFoodModal: FC<ManageFoodModalProps> = ({
  onClose,
  selectedFood,
  onSaveToDay,
  onSaveToStore,
  onEdit,
}) => {
  const { foods, removeFood } = useFoodStore(({ foods, removeFood }) => ({
    foods,
    removeFood,
  }));
  const [baseFoodValues, setBaseFoodValues] = useState<Food | undefined>(
    selectedFood.type === "edit"
      ? { ...baseFoodItem, ...selectedFood.foodItem }
      : undefined
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<{ food: Food }>({
    defaultValues: { food: { ...selectedFood.foodItem } },
  });

  const handleValuesCalculation = (value: number) => {
    // TODO: can this be better?
    if (!baseFoodValues) {
      return;
    }
    if (!value) {
      return;
    }
    const newCalories =
      ((baseFoodValues?.calories ?? 0) * Number(value)) /
      (baseFoodValues?.grams ?? 1);
    const newCarbohydrates =
      ((baseFoodValues?.carbohydrates ?? 0) * Number(value)) /
      (baseFoodValues?.grams ?? 1);
    const newProteins =
      ((baseFoodValues?.proteins ?? 0) * Number(value)) /
      (baseFoodValues?.grams ?? 1);
    const newFats =
      ((baseFoodValues?.fats ?? 0) * Number(value)) /
      (baseFoodValues?.grams ?? 1);
    setValue("food.calories", parseFloat(newCalories.toFixed(2)));
    setValue("food.carbohydrates", parseFloat(newCarbohydrates.toFixed(2)));
    setValue("food.proteins", parseFloat(newProteins.toFixed(2)));
    setValue("food.fats", parseFloat(newFats.toFixed(2)));
  };

  const { onChange: onGramsChange, ...remainingGramsProps } = register(
    "food.grams",
    { required: true }
  );

  const onSubmit: SubmitHandler<{ food: Food }> = (data) => {
    if (selectedFood.type === "addToDay") {
      onSaveToDay?.({
        meal: selectedFood.foodItem?.meal ?? "breakfast",
        foodItem: data.food,
      });
    }
    if (selectedFood.type === "addToStore") {
      onSaveToStore?.({
        meal: selectedFood.foodItem?.meal ?? "breakfast",
        foodItem: data.food,
      });
    }
    if (selectedFood.type === "edit") {
      onEdit?.({ foodItem: data.food, index: selectedFood.index });
    }
    onClose();
  };

  return (
    <div className="absolute flex items-center w-full h-full ">
      <div
        className="absolute w-full h-full bg-[#00000050]"
        onClick={onClose}
      />
      <div className="flex w-full h-fit flex-col bg-white z-[10] rounded-[16px] mx-[10px] py-[10px]">
        <div className="flex justify-end pr-[20px]">
          <AiOutlineClose style={{ fontSize: "25px" }} onClick={onClose} />
        </div>
        <ReactSelect
          className="px-[5px] h-[30px] m-[15px]"
          options={foods.map((food, i) => ({ label: food.name, value: i }))}
          onChange={(selectedOption) => {
            const selectedFoodItem = foods[Number(selectedOption?.value)];
            setBaseFoodValues(selectedFoodItem);
            setValue("food", selectedFoodItem);
          }}
        />
        <form
          className="flex flex-col px-[20px] gap-y-[10px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register("food.name", { required: true })}
            label="Name"
            error={errors.food?.name}
            placeholder="Insert food name"
          />
          <Input
            {...register("food.calories", { required: true })}
            label="Calories"
            type="number"
            error={errors.food?.calories}
            placeholder="Insert food calories"
          />
          <Input
            {...register("food.carbohydrates", { required: true })}
            label="Carbs"
            type="number"
            error={errors.food?.carbohydrates}
            placeholder="Insert food carbohydrates"
          />
          <Input
            {...register("food.proteins", { required: true })}
            label="Proteins"
            type="number"
            error={errors.food?.proteins}
            placeholder="Insert food proteins"
          />
          <Input
            {...register("food.fats", { required: true })}
            label="Fats"
            type="number"
            error={errors.food?.fats}
            placeholder="Insert food fats"
          />
          <Input
            {...remainingGramsProps}
            onChange={(e) => {
              if (["addToDay", "edit"].includes(selectedFood.type)) {
                handleValuesCalculation(Number(e.currentTarget.value));
                return;
              }
              onGramsChange(e);
            }}
            label="Grams"
            type="number"
            error={errors.food?.grams}
            placeholder="Insert quantity in grams"
          />
          <div className="flex ">
            <Button>Save</Button>
            {selectedFood.type === "addToStore" && (
              <Button
                type="button"
                className="bg-red-600"
                onClick={() => {
                  if (!baseFoodValues) {
                    return;
                  }
                  removeFood(baseFoodValues.name);
                }}
              >
                Delete
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
