import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Modal } from "@/components/ui/Modal";
import { useFoodStore } from "@/store/FoodStore";
import { Food, Meals } from "@/types";
import dayjs from "dayjs";
import { useState } from "react";

const FavoriteMealModal = ({
  onClose,
  foods,
}: {
  onClose: () => void;
  selectedMeal?: Meals;
  foods?: { food: Food; index: number }[];
}) => {
  const { upsertFavoriteMeal } = useFoodStore(({ upsertFavoriteMeal }) => ({
    upsertFavoriteMeal,
  }));

  const [mealName, setMealName] = useState<string>("");

  const handleSaveAsFavorite = () => {
    if (!mealName) {
      return;
    }
    upsertFavoriteMeal({
      mealFoods: foods?.map(({ food }) => food) ?? [],
      name: mealName,
    });
  };

  return (
    <Modal onClose={onClose} title="Favorite meal">
      <div className="flex flex-col gap-y-[15px]">
        {!!foods?.length && (
          <div className="flex flex-col gap-y-[5px]">
            <Input
              value={mealName}
              onChange={(e) => {
                setMealName(e.currentTarget.value);
              }}
            />
            <Button onClick={handleSaveAsFavorite} disabled={!mealName}>
              Save meal as favorite
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default FavoriteMealModal;
