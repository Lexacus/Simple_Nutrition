export type Meals =
  | "breakfast"
  | "morningSnacks"
  | "lunch"
  | "eveningSnacks"
  | "dinner";

export type Food = {
  _id?: string;
  calories: number;
  name: string;
  proteins: number;
  carbohydrates: number;
  fats: number;
  grams: number;
  meal?: Meals;
};

export type IndexedMeals = { food: Food; index: number }[];

export type DietDay = {
  foods: Food[];
};

export type FavoriteMeal = { name: string; mealFoods: Food[] };
