import { ReactSelectOption } from "@/types";
import { FC } from "react";
import ReactSelect, { SingleValue } from "react-select";

const SavedFoodSelector: FC<{
  foodOptions: {
    label: string;
    value: number;
  }[];
  onFoodSelect: (ReactSelectOption: ReactSelectOption<number>) => void;
}> = ({ foodOptions, onFoodSelect }) => {
  return (
    <ReactSelect
      /*   key={JSON.stringify(baseFoodValues)} */ // TODO: there might be a better way to do this
      className="px-[5px] h-[30px] m-[15px]"
      options={foodOptions}
      onChange={onFoodSelect}
      placeholder="Select food from store..."
    />
  );
};

export default SavedFoodSelector;
