import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { useFoodStore } from "../store/FoodStore";
import { Food, Meals } from "../types";
import { Button } from "./common/Button";
import { Input } from "./common/Input";
import { Checkbox } from "./common/Checkbox";
import { ModalOverlay } from "./ui/ModalOverlay";
import { Modal } from "./ui/Modal";

type ManageFoodModalProps = {
  onClose: () => void;
  selectedFood: {
    foodItem?: Partial<Food>;
    type: "addToDay" | "edit" | "addToStore";
    index: number;
  };
  onSaveToDay?: (foodItem: Food) => void;
  onEdit?: ({ foodItem, index }: { foodItem: Food; index: number }) => void;
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
  onEdit,
}) => {
  const { foods, upsertFood, deleteFood } = useFoodStore(
    ({ foods, upsertFood, deleteFood }) => ({
      foods,
      upsertFood,
      deleteFood,
    })
  );

  const [baseFoodValues, setBaseFoodValues] = useState<Food | undefined>(
    selectedFood.type === "edit"
      ? { ...baseFoodItem, ...selectedFood.foodItem }
      : undefined
  );

  const [shouldSaveToStore, setShouldSaveToStore] = useState(false);
  const [saveConfirmModal, setSaveConfirmModal] = useState<Food | undefined>();
  /*   const [foodAlreadyExists, setFoodAlreadyExists] =useState(false); */

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<{ food: Food }>({
    defaultValues: { food: { ...selectedFood.foodItem } },
  });

  // this takes the current grams value and updates the form nutritional values based on the chosen quantity in grams
  // (eg. values in the store are for 50 grams, passing 100g will update the form to double the store values)
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

  const clearForm = () => {
    reset();
    setBaseFoodValues(undefined);
  };

  // function to delete foods from the store. Pressing on the toast will "undo" the deletion, putting the food back in the store
  const handleStoredFoodDeletion = () => {
    if (!baseFoodValues) {
      return;
    }

    deleteFood(baseFoodValues.name);
    reset();

    toast("Food deleted. Press to undo.", {
      type: "success",
      onClick: () => {
        upsertFood({
          ...baseFoodValues,
          meal: selectedFood.foodItem?.meal ?? "breakfast",
        });
      },
      pauseOnHover: false,
    });
  };

  const onSubmit: SubmitHandler<{ food: Food }> = (data) => {
    const foodToSave = {
      ...data.food,
      meal: selectedFood.foodItem?.meal ?? "breakfast",
    };
    // if food is being added to a meal in a day
    if (selectedFood.type === "addToDay") {
      onSaveToDay?.(foodToSave);
    }
    // if food is being added to store or "also add to store" has been checked when saving to a meal in a day
    // it will ask for confirmation if a food with the same name already exists, otherwise it will simply save to store
    if (selectedFood.type === "addToStore" || shouldSaveToStore) {
      const foodAlreadyExists = foods.find(
        ({ name }) => name === data.food.name
      );
      if (!foodAlreadyExists) {
        upsertFood(foodToSave);
        onClose();
        return;
      }
      setSaveConfirmModal(foodToSave);
    }
    if (selectedFood.type === "edit") {
      onEdit?.({ foodItem: data.food, index: selectedFood.index });
    }
    if (!shouldSaveToStore) {
      onClose();
    }
  };

  return (
    <>
      {saveConfirmModal && (
        <Modal
          className="z-[200]"
          onClose={() => {
            setSaveConfirmModal(undefined);
          }}
        >
          <span className="text-center">{`There is a food named ${saveConfirmModal.name} saved in the store already. Would you like to overwrite it?`}</span>
          <div className="flex">
            <Button
              onClick={() => {
                upsertFood(saveConfirmModal);
                onClose();
              }}
            >
              Yes
            </Button>
            <Button
              className="bg-red-600"
              onClick={() => {
                setSaveConfirmModal(undefined);
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      )}
      <Modal onClose={onClose}>
        <ReactSelect
          key={JSON.stringify(baseFoodValues)} // TODO: there might be a better way to do this
          className="px-[5px] h-[30px] m-[15px]"
          options={foods.map((food, i) => ({ label: food.name, value: i }))}
          onChange={(selectedOption) => {
            const selectedFoodItem = foods[Number(selectedOption?.value)];
            setBaseFoodValues(selectedFoodItem);
            setValue("food", selectedFoodItem);
          }}
          placeholder="Select food from store..."
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
          {!baseFoodValues && (
            <Checkbox
              label="Also save to store"
              checked={shouldSaveToStore}
              onChange={() => {
                setShouldSaveToStore((prev) => !prev);
              }}
            />
          )}
          <Button type="button" onClick={clearForm}>
            Clear
          </Button>
          <div className="flex">
            <Button>{selectedFood.type === "edit" ? "Edit" : "Save"}</Button>
            {selectedFood.type === "addToStore" && (
              <Button
                type="button"
                className="bg-red-600"
                onClick={handleStoredFoodDeletion}
              >
                Delete
              </Button>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};
