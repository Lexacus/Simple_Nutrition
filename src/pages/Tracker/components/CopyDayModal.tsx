import ConfirmModal from "@/components/confirmModal/ConfirmModal";
import { Modal } from "@/components/ui/Modal";
import { ModalOverlay } from "@/components/ui/ModalOverlay";
import { useTrackerStore } from "@/store/TrackerStore";
import { Meals, ReactSelectOption } from "@/types";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { toast } from "react-toastify";

type CopyDayModalProps = { onClose: () => void };

const CopyDayModal: FC<CopyDayModalProps> = ({ onClose }) => {
  const [dayType, setDayType] = useState<ReactSelectOption<string>>({
    label: "Planner",
    value: "planner"
  });
  const [dayToCopy, setDayToCopy] = useState<ReactSelectOption<string> | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState<Record<Meals, boolean>>({
    breakfast: true,
    lunch: true,
    dinner: true,
    morningSnacks: true,
    eveningSnacks: true
  });

  const dayTypeOptions: ReactSelectOption<string>[] = [
    { label: "Planner", value: "planner" },
    { label: "Tracker", value: "tracker" }
  ];

  const { trackedDays, selectedDate, editTrackedDay } = useTrackerStore(
    ({ trackedDays, selectedDate, editTrackedDay }) => ({
      trackedDays,
      selectedDate,
      editTrackedDay,
    })
  );

  const selectableDayOptions = Object.keys(trackedDays)
    .filter((date) => date !== selectedDate)
    .map((date) => ({
      label: dayjs(date).format("D MMM YYYY"),
      value: date,
    }));

  const copyDayToCurrentDay = () => {
    if (!dayToCopy) {
      return;
    }

    const mealsToCopy = Object.values(trackedDays[dayToCopy.value])[0].filter(
      (food) => !!selectedMeals[food.meal as Meals]
    );
    editTrackedDay(dayjs(selectedDate).format("YYYY-MM-DD"), {
      foods: [...(trackedDays[dayjs(selectedDate).format("YYYY-MM-DD")]?.foods || []), ...mealsToCopy],
    });
    toast("Day copied", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "success",
    });
    onClose();
  };

  const toggleConfirmModal = () => {
    setConfirmModalOpen((prev) => !prev);
  };

  const toggleMeal = (meal: Meals) => () => {
    setSelectedMeals((prev) => ({
      ...prev,
      [meal]: !prev[meal],
    }));
  };

  if (confirmModalOpen) {
    return (
      <>
        <ModalOverlay onClick={onClose} />
        <ConfirmModal
          onClose={toggleConfirmModal}
          onConfirm={copyDayToCurrentDay}
        />
      </>
    );
  }

  return (
    <Modal onClose={onClose} title="Copy Day">
      <div className="flex flex-col gap-4">
        <select 
          className="select select-bordered w-full"
          onChange={(e) => {
            const option = dayTypeOptions.find(opt => opt?.value === e.target.value);
            if (option) setDayType(option);
          }}
          value={dayType?.value}
        >
          {dayTypeOptions.map((option) => (
            <option key={option?.value} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>

        <select 
          className="select select-bordered w-full"
          onChange={(e) => {
            const option = selectableDayOptions.find(opt => opt.value === e.target.value);
            setDayToCopy(option || null);
          }}
          value={dayToCopy?.value || ""}
        >
          <option value="" disabled>Select day to copy...</option>
          {selectableDayOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {!!dayToCopy && (
          <div className="flex flex-col gap-2">
            {Object.entries(selectedMeals).map(([meal, isSelected]) => (
              <label key={meal} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={isSelected}
                  onChange={toggleMeal(meal as Meals)}
                />
                <span className="text-sm capitalize">{meal}</span>
              </label>
            ))}
          </div>
        )}

        <button 
          className="btn w-full" 
          disabled={!dayToCopy}
          onClick={toggleConfirmModal}
        >
          Copy to current day
        </button>
      </div>
    </Modal>
  );
};

export default CopyDayModal;
