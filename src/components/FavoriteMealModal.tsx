import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import ReactSelect from "react-select";
import { useFoodStore } from "../store/FoodStore";
import { Food } from "../types";
import { Button } from "./common/Button";
import { Input } from "./common/Input";
import { ModalOverlay } from "./ui/ModalOverlay";

interface FavoriteMealModalProps {
  onClose: () => void;
}

export const FavoriteMealModal: FC<FavoriteMealModalProps> = ({ onClose }) => {
  const { foods } = useFoodStore(({ foods }) => ({ foods }));

  const { register, setValue, watch, handleSubmit } = useForm<{
    name: string;
    foods: Food[];
  }>({ defaultValues: { foods: [] } });

  const currentMealFoods = watch("foods");

  const onSubmit: SubmitHandler<{ name: string; foods: Food[] }> = (data) => {
    console.log(data);
  };

  return (
    <div className="absolute flex items-center w-full h-full">
      <ModalOverlay onClick={onClose} />
      <div className="flex w-full h-fit flex-col bg-white z-[10] rounded-[16px] mx-[10px] py-[10px]">
        <div className="flex justify-end pr-[20px]">
          <AiOutlineClose style={{ fontSize: "25px" }} onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("name", { required: true })} label="Name" />
          <ReactSelect
            /* key={JSON.stringify(baseFoodValues)}  */ // TODO: there might be a better way to do this
            className="px-[5px] h-[30px] m-[15px]"
            options={foods.map((food, i) => ({ label: food.name, value: i }))}
            onChange={(selectedOption) => {
              /* const selectedFoodItem = foods[Number(selectedOption?.value)];
              setBaseFoodValues(selectedFoodItem);
              setValue("food", selectedFoodItem); */
              const selectedFoodItem = foods[Number(selectedOption?.value)];
              setValue("foods", [...currentMealFoods, selectedFoodItem]);
            }}
            placeholder="Select food from store..."
          />
          <div className="flex flex-col overflow-auto max-h-[150px]">
            {currentMealFoods.map(({ name }) => (
              <span>{name}</span>
            ))}
          </div>
          <Button>Save</Button>
        </form>
      </div>
    </div>
  );
};
