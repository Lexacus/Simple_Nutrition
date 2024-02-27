import { FC } from "react";
import { Food, Meals } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./common/Input";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "./common/Button";
import { useFoodStore } from "../store/FoodStore";

type ManageFoodModalProps = {
  onClose: () => void;
  selectedFood: {
    foodItem?: Food;
    type: "addToDay" | "edit" | "addToStore";
    index: number;
  };
  onSaveToDay?: ({ meal, foodItem }: { meal: Meals; foodItem: Food }) => void;
  onEdit?: ({ foodItem, index }: { foodItem: Food; index: number }) => void;
  onSaveToStore?: ({ meal, foodItem }: { meal: Meals; foodItem: Food }) => void;
};

export const ManageFoodModal: FC<ManageFoodModalProps> = ({
  onClose,
  selectedFood,
  onSaveToDay,
  onSaveToStore,
  onEdit,
}) => {
  const { foods } = useFoodStore(({ foods }) => ({ foods }));
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<{ food: Food }>({
    defaultValues: { food: { ...selectedFood.foodItem } },
  });

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
        <select
          onChange={(e) => {
            setValue("food", foods[Number(e.target.value)]);
          }}
          className="px-[15px] h-[30px] m-[15px]"
        >
          <option disabled selected>
            Select a food
          </option>
          {foods.map((food, i) => (
            <option value={i}>{food.name}</option>
          ))}
        </select>
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
            {...register("food.grams", { required: true })}
            label="Grams"
            type="number"
            error={errors.food?.grams}
            placeholder="Insert quantity in grams"
          />
          <Button>Salva</Button>
        </form>
      </div>
    </div>
  );
};
