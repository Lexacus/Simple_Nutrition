import { ReactSelectOption } from "@/types";
import { FC } from "react";
import ReactSelect from "react-select";

const SavedFoodSelector: FC<{
  foodOptions: {
    label: string;
    value: number;
  }[];
  onFoodSelect: (ReactSelectOption: ReactSelectOption<number>) => void;
}> = ({ foodOptions, onFoodSelect }) => {
  return (
    <ReactSelect
      className="px-[5px] h-[30px] m-[10px]"
      options={foodOptions}
      onChange={onFoodSelect}
      isClearable
      placeholder="Select food from store..."
    />
  );
};

export default SavedFoodSelector;
