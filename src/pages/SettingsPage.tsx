import { Clipboard } from "@capacitor/clipboard";
import { toast } from "react-toastify";
import { Button } from "../components/common/Button";
import { useFoodStore } from "../store/FoodStore";
import { useTrackerStore } from "../store/TrackerStore";
import { FavoriteMeal, Food } from "../types";

const SettingsPage = () => {
  const { days, setDays } = useTrackerStore(({ days, setDays }) => ({
    days,
    setDays,
  }));

  const { foods, favoriteMeals, setFavoriteMeals, setFoods } = useFoodStore(
    ({ foods, favoriteMeals, setFavoriteMeals, setFoods }) => ({
      foods,
      favoriteMeals,
      setFavoriteMeals,
      setFoods,
    })
  );

  return (
    <>
      <div className="flex flex-col gap-y-10 mt-10">
        <Button
          onClick={async () => {
            await Clipboard.write({
              string: JSON.stringify({
                foods: foods,
                favoriteMeals: favoriteMeals,
              }),
            });
            toast("Successfully copied to clipboard", {
              hideProgressBar: true,
              type: "success",
            });
          }}
        >
          Copy food store in clipboard
        </Button>
        <Button
          onClick={async () => {
            const jsonFoodStore: {
              foods: Food[];
              favoriteMeals: FavoriteMeal[];
            } = JSON.parse((await Clipboard.read()).value);
            setFoods(jsonFoodStore.foods);
            setFavoriteMeals(jsonFoodStore.favoriteMeals);
            toast("Successfully loaded from clipboard", {
              hideProgressBar: true,
              type: "success",
            });
          }}
        >
          Load food store from clipboard
        </Button>
      </div>
      <div className="flex flex-col gap-y-10 mt-10">
        <Button
          onClick={async () => {
            await Clipboard.write({ string: JSON.stringify(days) });
            toast("Successfully copied to clipboard", {
              hideProgressBar: true,
              type: "success",
            });
          }}
        >
          Copy tracked days in clipboard
        </Button>
        <Button
          onClick={async () => {
            const jsonDays = await Clipboard.read();
            setDays(JSON.parse(jsonDays.value));
            toast("Successfully loaded from clipboard", {
              hideProgressBar: true,
              type: "success",
            });
          }}
        >
          Load tracked days from clipboard
        </Button>
        <Button
          onClick={() => {
            const convertedFoods = foods.map((food) => ({
              ...food,
              //@ts-expect-error this will convert old foods from the store with the old type (without quantities) to the new type
              quantity: food.quantity ?? { label: "grams", value: food.grams },
            }));
            setFoods(convertedFoods);
            toast("Successfully converted foods", {
              hideProgressBar: true,
              type: "success",
            });
          }}
        >
          Convert food store grams to quantities
        </Button>
      </div>
    </>
  );
};

export default SettingsPage;
