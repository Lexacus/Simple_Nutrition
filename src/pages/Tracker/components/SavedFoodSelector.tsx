import { FC } from "react";
import { Food, ReactSelectOption } from "@/types";

interface SavedFoodSelectorProps {
  foodOptions: {
    label: string;
    value: number;
  }[];
  onFoodSelect: (option: ReactSelectOption<number>) => void;
}

const SavedFoodSelector: FC<SavedFoodSelectorProps> = ({ foodOptions, onFoodSelect }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = foodOptions.find(
      (food) => food.value === Number(e.target.value)
    );
    onFoodSelect(selectedOption || null);
  };

  return (
    <select 
      className="select select-bordered w-full"
      onChange={handleChange}
      defaultValue=""
    >
      <option value="" disabled>Select food from store...</option>
      {foodOptions.map((food) => (
        <option key={food.value} value={food.value}>
          {food.label}
        </option>
      ))}
    </select>
  );
};

export default SavedFoodSelector;
