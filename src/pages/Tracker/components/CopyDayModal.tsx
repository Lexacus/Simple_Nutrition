import { Button } from "@/components/common/Button";
import { Checkbox } from "@/components/common/Checkbox";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";
import { Modal } from "@/components/ui/Modal";
import { ModalOverlay } from "@/components/ui/ModalOverlay";
import { useTrackerStore } from "@/store/TrackerStore";
import { Meals, ReactSelectOption, SelectOption } from "@/types";
import dayjs from "dayjs";
import { FC, useState } from "react";
import ReactSelect from "react-select";
import { toast } from "react-toastify";

const today = dayjs().format("YYYY-MM-DD");

type CopyDayModalProps = { onClose: () => void };

const dayTypeOptions = [
  { label: "Planner", value: "planner" },
  { label: "Tracker", value: "tracker" },
];

const week = {
  monday: 1,
  tuesday: 1,
  wednesday: 1,
  thursday: 1,
  friday: 1,
  saturday: 1,
  sunday: 1,
};

const CopyDayModal: FC<CopyDayModalProps> = ({ onClose }) => {
  const { trackedDays, editTrackedDay, selectedDate } = useTrackerStore(
    ({ trackedDays, editTrackedDay, selectedDate }) => ({
      trackedDays,
      editTrackedDay,
      selectedDate,
    })
  );

  const [dayType, setDayType] = useState<SelectOption<string>>(
    dayTypeOptions[0]
  );

  const [dayToCopy, setDayToCopy] = useState<SelectOption<string>>();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState<Record<Meals, boolean>>({
    breakfast: true,
    dinner: true,
    eveningSnacks: true,
    lunch: true,
    morningSnacks: true,
  });

  const daysFilter = (day: string) => {
    const isPlannerDay = !!week[day.toLowerCase() as keyof typeof week];
    if (day === "Invalid Date" || day === dayjs().format("YYYY-MM-DD")) {
      return false;
    }
    if (isPlannerDay && dayType.value === "planner") {
      return true;
    }
    if (!isPlannerDay && dayType.value === "tracker") {
      return true;
    }
  };

  const selectableDayOptions = Object.keys(trackedDays)
    .filter(daysFilter)
    .map((day) => ({
      label:
        dayType.value === "planner" ? day : dayjs(day).format("DD/MM/YYYY"),
      value: day,
    }));

  const onDayTypeSelect = (ReactSelectOption: ReactSelectOption<string>) => {
    if (!ReactSelectOption) {
      return;
    }
    setDayType(ReactSelectOption);
  };

  const onDayToCopySelect = (ReactSelectOption: ReactSelectOption<string>) => {
    if (!ReactSelectOption) {
      return;
    }
    setDayToCopy(ReactSelectOption);
  };

  const copyDayToCurrentDay = () => {
    if (!dayToCopy) {
      return;
    }

    const mealsToCopy = Object.values(trackedDays[dayToCopy.value])[0].filter(
      (food) => !!selectedMeals[food.meal as Meals]
    );

    editTrackedDay(dayjs(selectedDate).format("YYYY-MM-DD"), {
      foods: [...trackedDays[today].foods, ...mealsToCopy],
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
    <>
      <ModalOverlay onClick={onClose} />
      <Modal onClose={onClose}>
        <ReactSelect
          options={dayTypeOptions}
          onChange={onDayTypeSelect}
          value={dayType}
        />
        <ReactSelect
          options={selectableDayOptions}
          onChange={onDayToCopySelect}
          value={dayToCopy}
          placeholder="Select day to copy..."
          isDisabled={!dayType}
        />
        {!!dayToCopy && (
          <div className="flex flex-col items-start w-full gap-y-[3px]">
            <Checkbox
              label="Breakfast"
              checked={!!selectedMeals.breakfast}
              onChange={toggleMeal("breakfast")}
            />
            <Checkbox
              label="Morning Snacks"
              checked={!!selectedMeals.morningSnacks}
              onChange={toggleMeal("morningSnacks")}
            />
            <Checkbox
              label="Lunch"
              checked={!!selectedMeals.lunch}
              onChange={toggleMeal("lunch")}
            />
            <Checkbox
              label="Evening Snacks"
              checked={!!selectedMeals.eveningSnacks}
              onChange={toggleMeal("eveningSnacks")}
            />
            <Checkbox
              label="Dinner"
              checked={!!selectedMeals.dinner}
              onChange={toggleMeal("dinner")}
            />
          </div>
        )}
        <Button disabled={!dayToCopy} onClick={toggleConfirmModal}>
          Copy to current day
        </Button>
      </Modal>
    </>
  );
};

export default CopyDayModal;
