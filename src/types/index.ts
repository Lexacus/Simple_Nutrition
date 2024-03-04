export type Meals =
  | "breakfast"
  | "morningSnacks"
  | "lunch"
  | "eveningSnacks"
  | "dinner";

export type Food = {
  calories: number;
  name: string;
  proteins: number;
  carbohydrates: number;
  fats: number;
  grams: number;
  meal?: Meals;
};

export type DietDay = {
  foods: Food[];
};

export type FavoriteMeal = { name: string; mealFoods: Food[] };
