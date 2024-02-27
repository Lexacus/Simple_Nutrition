import { FC } from "react";
import { Food, Meals } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./common/Input";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "./common/Button";

type ManageFoodModalProps = {
  onClose: () => void;
  selectedFood: { foodItem?: Food; type: "add" | "edit"; index: number };
  onSave?: ({ meal, foodItem }: { meal: Meals; foodItem: Food }) => void;
  onEdit?: ({ foodItem, index }: { foodItem: Food; index: number }) => void;
};

export const ManageFoodModal: FC<ManageFoodModalProps> = ({
  onClose,
  selectedFood,
  onSave,
  onEdit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Food>({ defaultValues: { ...selectedFood.foodItem } });

  const onSubmit: SubmitHandler<Food> = (data) => {
    if (selectedFood.type === "add") {
      onSave?.({
        meal: selectedFood.foodItem?.meal ?? "breakfast",
        foodItem: data,
      });
    }
    if (selectedFood.type === "edit") {
      onEdit?.({ foodItem: data, index: selectedFood.index });
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
            {...register("fats", { required: true })}
            label="Fats"
            type="number"
            error={errors.fats}
            placeholder="Insert food fats"
          />
          <Input
            {...register("grams", { required: true })}
            label="Grams"
            type="number"
            error={errors.grams}
            placeholder="Insert quantity in grams"
          />
          <Button>Salva</Button>
        </form>
      </div>
    </div>
  );
};
