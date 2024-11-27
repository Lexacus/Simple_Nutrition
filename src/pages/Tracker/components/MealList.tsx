import { Food, Meals } from "@/types";
import { FC, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddFoodModal from "./AddFoodModal";
import EditFoodModal from "./EditFoodModal";
import FavoriteMealModal from "./FavoriteMealModal";

interface MealListProps {
  tabName: string;
  mealName: Meals;
  foods?: { food: Food; index: number }[];
  isEditable?: boolean;
}

const TabName = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col cursor-pointer">
      <div className="flex justify-between items-center">
        <span className="capitalize font-bold">{`${title} `}</span>
      </div>
    </div>
  );
};

const MealList: FC<MealListProps> = ({
  mealName,
  tabName,
  foods,
  isEditable = true,
}) => {
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);

  const [openedIndex, setOpenedIndex] = useState<number>();
  const [favoriteModalOpen, setFavoriteModalOpen] = useState(false);

  const onAddClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
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
        <AddFoodModal onClose={closeModals} selectedMeal={mealName} />
      )}
      {openedIndex !== undefined && (
        <EditFoodModal onClose={closeModals} selectedIndex={openedIndex} />
      )}
      {favoriteModalOpen && (
        <FavoriteMealModal
          onClose={closeModals}
          foods={foods}
          selectedMeal={mealName}
        />
      )}

      <div className="flex card bg-base-200 shadow-sm card-body p-[10px]">
        <div className="rounded-b-[16px]">
          <div
            className="flex flex-row gap-y-[5px] rounded-[8px] h-full items-center"
            onClick={
              isEditable && !!foods?.length ? openFavoriteMealModal : undefined
            }
          >
            <div className="flex flex-col w-full h-full gap-y-[5px]">
              <div className="flex justify-between w-full items-center">
                <TabName title={tabName} />
                {isEditable && (
                  <button
                    className="btn btn-circle btn-primary min-w-[1.25rem] min-h-[1.25rem] w-[1.25rem] h-[1.25rem] "
                    onClick={onAddClick}
                  >
                    <AiOutlinePlus />
                  </button>
                )}
              </div>
              {/* FOOD LIST */}
              {foods?.map(({ food: { name, grams }, index }) => (
                <div
                  key={`${tabName}_${name}_${index}`}
                  className="flex justify-between items-center cursor-pointer w-full"
                  onClick={
                    isEditable
                      ? (e) => {
                          e.stopPropagation();
                          setOpenedIndex(index);
                        }
                      : undefined
                  }
                >
                  <div className="flex flex-row items-center justify-between w-full ">
                    <span className="text-[14px]">{`- ${name}`}</span>
                    <span className="text-[14px] font-semibold">{grams}g</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealList;
