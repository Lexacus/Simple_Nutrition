import { Food, Meals } from "@/types";
import { FC, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import AddFoodModal from "./AddFoodModal";
import EditFoodModal from "./EditFoodModal";
import FavoriteMealModal from "./FavoriteMealModal";

interface MealListProps {
  tabName: Meals;
  foods?: { food: Food; index: number }[];
  isEditable?: boolean;
}

const MealList: FC<MealListProps> = ({ tabName, foods, isEditable = true }) => {
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);

  const [openedIndex, setOpenedIndex] = useState<number>();
  const [favoriteModalOpen, setFavoriteModalOpen] = useState(false);

  const onAddClick = () => {
    setIsAddFoodOpen(true);
  };

  const openFavoriteMealModal = () => {
    setFavoriteModalOpen(true);
  };

  const closeModals = () => {
    setIsAddFoodOpen(false);
    setOpenedIndex(undefined);
    setFavoriteModalOpen(false);
  };

  return (
    <>
      {isAddFoodOpen && (
        <AddFoodModal onClose={closeModals} selectedMeal={tabName} />
      )}
      {openedIndex !== undefined && (
        <EditFoodModal onClose={closeModals} selectedIndex={openedIndex} />
      )}
      {favoriteModalOpen && (
        <FavoriteMealModal
          onClose={closeModals}
          foods={foods}
          selectedMeal={tabName}
        />
      )}

      <div className="flex flex-col p-[3px] gap-y-[0px] ">
        <div className="flex flex-col cursor-pointer">
          <div className="flex justify-between items-center">
            <span
              className="capitalize font-bold"
              onClick={isEditable ? openFavoriteMealModal : undefined}
            >{`${tabName} `}</span>
            {isEditable && (
              <AiFillPlusCircle
                className="text-blue-600 w-[20px] h-[20px]"
                onClick={onAddClick}
              />
            )}
          </div>
        </div>

        <div className=" px-[3px] pt-[5px] rounded-b-[16px]">
          <div className="flex flex-col gap-y-[5px] border-[1px] border-gray-600 p-[5px] rounded-[8px]">
            {foods?.map(({ food: { name, grams }, index }) => (
              <div
                key={`${tabName}_${name}`}
                className="flex justify-between items-center"
                onClick={isEditable ? () => setOpenedIndex(index) : undefined}
              >
                <div className="flex flex-row items-center gap-x-[5px]  w-full ">
                  <span className="text-[14px]">{`- ${name} (${grams}g)`}</span>
                </div>
              </div>
            ))}
            {!foods?.length && (
              <span className="w-full text-center text-[14px]">
                No foods in this meal yet
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MealList;
