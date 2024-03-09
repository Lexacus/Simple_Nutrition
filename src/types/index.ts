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
  quantity: { label: string; value: number };
  meal?: Meals;
};

export type DietDay = {
  foods: Food[];
};

export type FavoriteMeal = { name: string; mealFoods: Food[] };
