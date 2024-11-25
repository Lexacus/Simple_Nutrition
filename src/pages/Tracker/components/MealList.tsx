import { Food, Meals } from "@/types";
import { FC, useState } from "react";
import { AiOutlinePlus, AiOutlineInbox } from "react-icons/ai";
import AddFoodModal from "./AddFoodModal";
import EditFoodModal from "./EditFoodModal";
import FavoriteMealModal from "./FavoriteMealModal";

interface MealListProps {
  tabName: string;
  mealName: Meals;
  foods?: { food: Food; index: number }[];
  isEditable?: boolean;
}

const MealList: FC<MealListProps> = ({
  mealName,
  tabName,
  foods,
  isEditable = true,
}) => {
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [openedIndex, setOpenedIndex] = useState<number>();
  const [favoriteModalOpen, setFavoriteModalOpen] = useState(false);

  return (
    <>
      {isAddFoodOpen && (
        <AddFoodModal
          onClose={() => setIsAddFoodOpen(false)}
          selectedMeal={mealName}
        />
      )}
      {openedIndex !== undefined && (
        <EditFoodModal
          onClose={() => setOpenedIndex(undefined)}
          selectedIndex={openedIndex}
        />
      )}
      {favoriteModalOpen && (
        <FavoriteMealModal
          onClose={() => setFavoriteModalOpen(false)}
          foods={foods}
          selectedMeal={mealName}
        />
      )}

      <div className="flex card bg-base-200 shadow-sm card-body p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">{tabName}</h3>
            {!!foods?.length && (
              <span className="badge badge-sm">{foods.length}</span>
            )}
          </div>
          {isEditable && (
            <button
              className="btn btn-ghost btn-xs"
              onClick={() => setIsAddFoodOpen(true)}
            >
              <AiOutlinePlus className="h-3 w-3" />
            </button>
          )}
        </div>

        <ul>
          {foods?.map(({ food: { name, grams }, index }) => (
            <li
              key={`${tabName}_${name}_${index}`}
              className="flex justify-between items-center text-xs cursor-pointer hover:bg-base-300 rounded"
              onClick={isEditable ? () => setOpenedIndex(index) : undefined}
            >
              <span>{name}</span>
              <span className="opacity-70">{grams}g</span>
            </li>
          ))}
        </ul>

        {!foods?.length && (
          <div className="flex lg:flex-col items-center justify-center py-3 opacity-50">
            <AiOutlineInbox className="w-6 h-6" />
            <span className="text-xs">No food selected</span>
          </div>
        )}
      </div>
    </>
  );
};

export default MealList;
