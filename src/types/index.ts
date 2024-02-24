export type Food = {
  calories: number;
  name: string;
  proteins: number;
  carbohydrates: number;
  fats: number;
};

export type DietDay = {
  date: string;
  food: {
    breakfast?: Food[];
    morningSnacks?: Food[];
    lunch?: Food[];
    eveningSnacks?: Food[];
    dinner?: Food[];
  };
};
