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
  meal?: Meals;
};

export type DietDay = {
  date: string;
  foods: Food[];
};
