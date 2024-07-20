import { Button } from "@/components/common/Button";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";
import { Modal } from "@/components/ui/Modal";
import { ModalOverlay } from "@/components/ui/ModalOverlay";
import { useTrackerStore } from "@/store/TrackerStore";
import { ReactSelectOption, SelectOption } from "@/types";
import dayjs from "dayjs";
import { FC, useState } from "react";
import ReactSelect from "react-select";
import { toast } from "react-toastify";

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
    editTrackedDay(dayjs(selectedDate).format("YYYY-MM-DD"), {
      ...trackedDays[dayToCopy.value],
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
        <Button disabled={!dayToCopy} onClick={toggleConfirmModal}>
          Copy to current day
        </Button>
      </Modal>
    </>
  );
};

export default CopyDayModal;
