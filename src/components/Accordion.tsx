import { FC, useState } from "react";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillEdit,
  AiOutlineClose,
} from "react-icons/ai";
import ReactSelect from "react-select";
import { useFoodStore } from "../store/FoodStore";
import { useTrackerStore } from "../store/TrackerStore";
import { Food, Meals } from "../types";
import { Button } from "./common/Button";
import { Input } from "./common/Input";
import { Modal } from "./ui/Modal";

interface AccordionProps {
  tabName: Meals;
  onTabClick: () => void;
  open: boolean;
  foodItems?: { foodItem: Food; index: number }[];
}

export const Accordion: FC<AccordionProps> = ({
  onTabClick,
  open,
  tabName,
  foodItems,
}) => {
  const { days, editDay, selectedDate, setSelectedFood } = useTrackerStore(
    ({ days, editDay, selectedDate, setSelectedFood }) => ({
      days,
      editDay,
      selectedDate,
      setSelectedFood,
    })
  );

  const { favoriteMeals, upsertFavoriteMeal } = useFoodStore(
    ({ favoriteMeals, upsertFavoriteMeal }) => ({
      favoriteMeals,
      upsertFavoriteMeal,
    })
  );

  const [favoriteMealModalOpen, setFavoriteMealModalOpen] = useState<
    "save" | "load" | undefined
  >();
  const [favoriteMealName, setFavoriteMealName] = useState("");
  const [selectedFavoriteMeal, setSelectedFavoriteMeal] = useState<{
    name: string;
    mealFoods: Food[];
  }>();

  const onAddClick = () => {
    setSelectedFood({
      foodItem: {
        meal: tabName,
      },
      type: "addToDay",
      index: 0,
    });
  };

  const onEditClick = (index: number) => {
    setSelectedFood({
      foodItem: {
        ...days[selectedDate].foods[index],
      },
      type: "edit",
      index,
    });
  };

  const onDeleteClick = (index: number) => {
    const newFoods = days[selectedDate].foods.filter((_, i) => i !== index);
    editDay(selectedDate, {
      foods: [...newFoods],
    });
  };

  const onSaveAsFavoriteMeal = (name: string) => {
    upsertFavoriteMeal({
      mealFoods: foodItems?.map(({ foodItem }) => foodItem) ?? [],
      name,
    });
  };

  return (
    <>
      {/*TODO: Temporary code duplication, remember to fix it later */}
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
                options={favoriteMeals.map(({ name }, i) => ({
                  label: name,
                  value: i,
                }))}
                onChange={(selectedOption) => {
                  setSelectedFavoriteMeal(
                    favoriteMeals[Number(selectedOption?.value)]
                  );
                }}
                placeholder="Select favorite meal..."
              />
              <Button
                onClick={() => {
                  editDay(selectedDate, {
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
      <div className="flex flex-col px-[10px] gap-y-[10px] py-[10px]">
        <div onClick={onTabClick} className="flex justify-between items-center">
          <span className="capitalize">{`${tabName} ${
            foodItems?.length && foodItems.length > 0
              ? `(${foodItems.length})`
              : ""
          }`}</span>
          {open ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </div>

        {open && (
          <div>
            <div className="flex flex-col gap-y-[5px]">
              {foodItems?.map(({ foodItem: { name, grams }, index }) => {
                return (
                  <div
                    key={`${tabName}_${name}`}
                    className="flex justify-between items-center"
                  >
                    <span className="text-[14px]">{` - ${name} (${grams}g)`}</span>
                    <div className="flex justify-center items-center gap-x-[10px]">
                      <AiFillEdit
                        style={{ fontSize: "25px" }}
                        onClick={() => {
                          onEditClick(index);
                        }}
                      />
                      <AiOutlineClose
                        style={{ fontSize: "25px" }}
                        onClick={() => {
                          onDeleteClick(index);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              {!foodItems?.length && <span>No foods in this meal yet</span>}
            </div>
            <div className="flex flex-col">
              <Button
                className="text-blue-600 bg-transparent border-none"
                onClick={onAddClick}
              >
                Add
              </Button>
              {foodItems?.length ? (
                <Button
                  className="text-blue-600 bg-transparent border-none"
                  onClick={() => {
                    setFavoriteMealModalOpen("save");
                  }}
                >
                  Save as favorite meal
                </Button>
              ) : null}
              <Button
                className="text-blue-600 bg-transparent border-none"
                onClick={() => {
                  setFavoriteMealModalOpen("load");
                }}
              >
                Load from favorite meals
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
