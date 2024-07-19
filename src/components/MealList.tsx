import { FC, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import ReactSelect from "react-select";
import AddFoodModal from "../pages/Tracker/components/AddFoodModal";
import EditFoodModal from "../pages/Tracker/components/EditFoodModal";

import { useFoodStore } from "../store/FoodStore";
import { useTrackerStore } from "../store/TrackerStore";
import { Food, Meals } from "../types";
import { Button } from "./common/Button";
import { Input } from "./common/Input";
import { Modal } from "./ui/Modal";

interface MealListProps {
  tabName: Meals;
  foods?: { food: Food; index: number }[];
}

const MealList: FC<MealListProps> = ({ tabName, foods }) => {
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);

  const [openedIndex, setOpenedIndex] = useState<number>();
  const { editTrackedDay, selectedDate } = useTrackerStore(
    ({ editTrackedDay, selectedDate }) => ({
      editTrackedDay,
      selectedDate,
    })
  );

  const { favoriteMeals, upsertFavoriteMeal } = useFoodStore(
    ({ favoriteMeals, upsertFavoriteMeal }) => ({
      favoriteMeals,
      upsertFavoriteMeal,
    })
  );

  const favoriteMealOptions = favoriteMeals.map(({ name }, i) => ({
    label: name,
    value: i,
  }));

  const [favoriteMealModalOpen, setFavoriteMealModalOpen] = useState<
    "save" | "load" | undefined
  >();
  const [favoriteMealName, setFavoriteMealName] = useState("");
  const [selectedFavoriteMeal, setSelectedFavoriteMeal] = useState<{
    name: string;
    mealFoods: Food[];
  }>();

  const onAddClick = () => {
    setIsAddFoodOpen(true);
  };

  const onSaveAsFavoriteMeal = (name: string) => {
    upsertFavoriteMeal({
      mealFoods: foods?.map(({ food }) => food) ?? [],
      name,
    });
  };

  const closeModal = () => {
    setIsAddFoodOpen(false);
  };

  return (
    <>
      {isAddFoodOpen && (
        <AddFoodModal onClose={closeModal} selectedMeal={tabName} />
      )}
      {openedIndex !== undefined && (
        <EditFoodModal
          onClose={() => {
            setOpenedIndex(undefined);
          }}
          selectedIndex={openedIndex}
        />
      )}
      {favoriteMealModalOpen && (
        <Modal
          onClose={() => {
            setFavoriteMealModalOpen(undefined);
          }}
        >
          {favoriteMealModalOpen === "save" && (
            <>
              <Input
                label="Name"
                value={favoriteMealName}
                onChange={({ currentTarget: { value } }) => {
                  setFavoriteMealName(value);
                }}
              />
              <Button
                onClick={() => {
                  onSaveAsFavoriteMeal(favoriteMealName);
                  setFavoriteMealModalOpen(undefined);
                }}
              >
                Save as favorite meal
              </Button>
            </>
          )}
          {favoriteMealModalOpen === "load" && (
            <>
              <ReactSelect
                /* key={JSON.stringify(baseFoodValues)}  */ // TODO: there might be a better way to do this
                className="px-[5px] h-[30px] m-[15px]"
                options={favoriteMealOptions}
                onChange={(selectedOption) => {
                  setSelectedFavoriteMeal(
                    favoriteMeals[Number(selectedOption?.value)]
                  );
                }}
                placeholder="Select favorite meal..."
              />
              <Button
                onClick={() => {
                  editTrackedDay(selectedDate, {
                    foods: [...(selectedFavoriteMeal?.mealFoods ?? [])],
                  });
                  setFavoriteMealModalOpen(undefined);
                }}
              >
                Load favorite meal
              </Button>
            </>
          )}
        </Modal>
      )}
      <div className="flex flex-col p-[3px] gap-y-[0px] ">
        <div className="flex flex-col cursor-pointer">
          <div className="flex justify-between items-center">
            <span className="capitalize font-bold">{`${tabName} `}</span>
            <AiFillPlusCircle
              className="text-blue-600 w-[20px] h-[20px]"
              onClick={onAddClick}
            />
          </div>
        </div>

        <div className=" px-[3px] pt-[5px] rounded-b-[16px]">
          <div className="flex flex-col gap-y-[5px] border-[1px] border-gray-600 p-[5px] rounded-[8px]">
            {foods?.map(({ food: { name, grams }, index }) => {
              return (
                <div
                  key={`${tabName}_${name}`}
                  className="flex justify-between items-center"
                  onClick={() => setOpenedIndex(index)}
                >
                  <div className="flex flex-row items-center gap-x-[5px]  w-full ">
                    <span className="text-[14px]">{`- ${name} (${grams}g)`}</span>
                  </div>
                </div>
              );
            })}
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
