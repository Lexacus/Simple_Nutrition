import { Modal } from "@/components/ui/Modal";
import { useTrackerStore } from "@/store/TrackerStore";
import { FC } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

type ClearDayModalProps = {
  onClose: () => void;
};

const ClearDayModal: FC<ClearDayModalProps> = ({ onClose }) => {
  const { selectedDate, editTrackedDay } = useTrackerStore(
    ({ selectedDate, editTrackedDay }) => ({
      selectedDate,
      editTrackedDay,
    })
  );

  const handleClearDay = () => {
    editTrackedDay(dayjs(selectedDate).format("YYYY-MM-DD"), {
      foods: [],
    });
    toast("Day cleared", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "success",
    });
    onClose();
  };

  return (
    <Modal onClose={onClose} title="Clear Day">
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Are you sure you want to clear all foods from this day?
        </p>
        <div className="flex gap-2">
          <button
            className="btn btn-error flex-1"
            onClick={handleClearDay}
          >
            Clear day
          </button>
          <button
            className="btn flex-1"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ClearDayModal; 