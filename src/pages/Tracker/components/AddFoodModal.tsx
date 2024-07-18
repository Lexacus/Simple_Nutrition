import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "../../../components/ui/Modal";
import FoodForm from "./FoodForm";
import { Food, Meals } from "../../../types";
import { useFoodStore } from "../../../store/FoodStore";
import { useTrackerStore } from "../../../store/TrackerStore";
import { ChangeEvent, FC, useState } from "react";
import { SingleValue } from "react-select";
import { handleValuesCalculation } from "../utils/utils";

const AddFoodModal: FC<{ onClose: () => void; selectedMeal?: Meals }> = ({
  onClose,
  selectedMeal,
}) => {
  const { foods } = useFoodStore(({ foods }) => ({
    foods,
  }));

  const { selectedDate, days, editDay } = useTrackerStore(
    ({ selectedDate, days, editDay }) => ({
      selectedDate,
      days,
      editDay,
    })
  );

  const [baseFoodValues, setBaseFoodValues] = useState<Food>();

  const methods = useForm<Food>();
  const { reset, setValue } = methods;

  const foodOptions = foods.map((food, i) => ({ label: food.name, value: i }));

  const onFoodSaveToDay = (foodItem: Food) => {
    editDay(selectedDate, {
      foods: [
        ...days[selectedDate].foods,
        { ...foodItem, meal: selectedMeal ?? "breakfast" },
      ],
    });
    onClose();
  };

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

  return (
    <Modal onClose={onClose}>
      <FormProvider {...methods}>
        <FoodForm
          onSubmit={onFoodSaveToDay}
          foodOptions={foodOptions}
          onFoodSelect={onFoodSelect}
          onGramsChange={!baseFoodValues ? undefined : calculateMacros}
        />
      </FormProvider>
    </Modal>
  );
};

export default AddFoodModal;
