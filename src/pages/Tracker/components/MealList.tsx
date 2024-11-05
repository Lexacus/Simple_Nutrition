import { Food, Meals } from "@/types";
import { FC, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddFoodModal from "./AddFoodModal";
import EditFoodModal from "./EditFoodModal";
import FavoriteMealModal from "./FavoriteMealModal";

interface MealListProps {
  tabName: Meals;
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

const MealList: FC<MealListProps> = ({ tabName, foods, isEditable = true }) => {
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
        <div className=" px-[3px] pt-[5px] rounded-b-[16px]">
          <div
            className="flex flex-row gap-y-[5px] border-[1px] border-gray-600 p-[5px] rounded-[8px] h-full items-center"
            onClick={
              isEditable && !!foods?.length ? openFavoriteMealModal : undefined
            }
          >
            <div className="flex flex-col w-full h-full">
              <TabName title={tabName} />
              {/* FOOD LIST */}
              {foods?.map(({ food: { name, grams }, index }) => (
                <div
                  key={`${tabName}_${name}_${index}`}
                  className="flex justify-between items-center cursor-pointer w-fit"
                  onClick={
                    isEditable
                      ? (e) => {
                          e.stopPropagation();
                          setOpenedIndex(index);
                        }
                      : undefined
                  }
                >
                  <div className="flex flex-row items-center gap-x-[5px] w-fit ">
                    <span className="text-[14px]">{`- ${name} (${grams}g)`}</span>
                  </div>
                </div>
              ))}
            </div>
            {isEditable && (
              <button
                className="btn btn-circle btn-primary min-w-[1.5rem] min-h-[1.5rem] w-[1.5rem] h-[1.5rem] "
                onClick={onAddClick}
              >
                <AiOutlinePlus />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MealList;
