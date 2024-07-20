import { Food } from "../../../types";

export const handleValuesCalculation = (
  baseFoodValues: Food,
  newQuantityInGrams: number
) => {
  // this takes the current grams value and updates the form nutritional values based on the chosen quantity in grams
  // (eg. values in the store are for 50 grams, passing 100g will update the form to double the store values)

  const multiplier = newQuantityInGrams / (baseFoodValues?.grams ?? 1);

  const newCalories = (baseFoodValues?.calories ?? 0) * multiplier;
  const newCarbohydrates = (baseFoodValues?.carbohydrates ?? 0) * multiplier;
  const newProteins = (baseFoodValues?.proteins ?? 0) * multiplier;
  const newFats = (baseFoodValues?.fats ?? 0) * multiplier;

  return {
    calories: parseFloat(newCalories.toFixed(2)),
    carbohydrates: parseFloat(newCarbohydrates.toFixed(2)),
    proteins: parseFloat(newProteins.toFixed(2)),
    fats: parseFloat(newFats.toFixed(2)),
  };
};

/*   // function to delete foods from the store. Pressing on the toast will "undo" the deletion, putting the food back in the store
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
  }; */
