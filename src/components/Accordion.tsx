import { FC, useState } from "react";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillEdit,
  AiFillPlusCircle,
  AiFillStar,
  AiOutlineClose,
} from "react-icons/ai";
import { Food, Meals } from "../types";
import { Button } from "./common/Button";
import { useTrackerStore } from "../store/TrackerStore";
import { useFoodStore } from "../store/FoodStore";
import { ModalOverlay } from "./ui/ModalOverlay";
import { Input } from "./common/Input";
import ReactSelect from "react-select";
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
      <div className="flex flex-col p-[3px] gap-y-[0px]">
        <div className="flex flex-col border border-black rounded-[16px] p-[10px]">
          <div
            onClick={onTabClick}
            className="flex justify-between items-center"
          >
            <span className="capitalize">{`${tabName} ${
              foodItems?.length && foodItems.length > 0
                ? `(${foodItems.length})`
                : ""
            }`}</span>
            {open ? <AiFillCaretUp /> : <AiFillCaretDown />}
          </div>
          {/* {open && (
            <div className="flex">
              <AiFillPlusCircle />
              <AiFillStar />
            </div>
          )} */}
        </div>

        {open && (
          <div className="border-b border-l border-r border-black mx-[15px] px-[3px] pt-[5px] rounded-b-[16px]">
            <div className="flex flex-col gap-y-[5px]">
              {foodItems?.map(({ foodItem: { name, grams }, index }) => {
                return (
                  <div
                    key={`${tabName}_${name}`}
                    className="flex justify-between items-center"
                  >
                    <div className="flex flex-row items-center gap-x-[5px]">
                      <div className="min-w-[8px] min-h-[8px] bg-black rounded-full" />
                      <span className="text-[14px]">{`${name} (${grams}g)`}</span>
                    </div>
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
              {!foodItems?.length && (
                <span className="w-full text-center">
                  No foods in this meal yet
                </span>
              )}
            </div>
            <div className="flex flex-row w-full items-center justify-center mt-[5px]">
              <Button
                className="text-blue-600 bg-transparent border-none flex flex-col"
                onClick={onAddClick}
              >
                <AiFillPlusCircle />
                Add
              </Button>
              {foodItems?.length ? (
                <Button
                  className="text-blue-600 bg-transparent border-none flex flex-col"
                  onClick={() => {
                    setFavoriteMealModalOpen("save");
                  }}
                >
                  <AiFillStar />
                  Save
                </Button>
              ) : null}
              <Button
                className="text-blue-600 bg-transparent border-none flex flex-col"
                onClick={() => {
                  setFavoriteMealModalOpen("load");
                }}
              >
                <AiFillStar />
                Load
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
