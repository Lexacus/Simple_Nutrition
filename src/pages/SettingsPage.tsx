import { Clipboard } from "@capacitor/clipboard";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "../components/common/Button";
import { useFoodStore } from "../store/FoodStore";
import { useTrackerStore } from "../store/TrackerStore";

const SettingsPage = () => {
  const { days, setDays } = useTrackerStore(({ days, setDays }) => ({
    days,
    setDays,
  }));

  const { foods, setFoods } = useFoodStore(({ foods, setFoods }) => ({
    foods,
    setFoods,
  }));

  return (
    <>
      <div className="flex flex-col gap-y-10 mt-10">
        <Button
          onClick={async () => {
            await Clipboard.write({ string: JSON.stringify(foods) });
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
            const jsonFoods = await Clipboard.read();
            setFoods(JSON.parse(jsonFoods.value));
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
      </div>
    </>
  );
};

export default SettingsPage;
