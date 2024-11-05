import { Button } from "@/components/common/Button";
import { ModalOverlay } from "@/components/ui/ModalOverlay";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useMacroCalculation } from "@/hooks/useMacroCalculation";
import { useTrackerStore } from "@/store/TrackerStore";
import Summary from "./components/Summary";
import TrackerList from "./components/TrackerList";
import CopyDayModal from "./components/CopyDayModal";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";

const today = dayjs().format("YYYY-MM-DD");

type TrackerProps = {
  type: "tracker" | "planner";
};

const Tracker: FC<TrackerProps> = ({ type }) => {
  const {
    setSelectedDate,
    editTrackedDay,
    overlayMenuOpen,
    setOverlayMenuOpen,
  } = useTrackerStore(
    ({
      setSelectedDate,
      editTrackedDay,
      overlayMenuOpen,
      setOverlayMenuOpen,
    }) => ({
      setSelectedDate,
      editTrackedDay,
      overlayMenuOpen,
      setOverlayMenuOpen,
    })
  );

  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [resetConfirmationModalOpen, setResetConfirmationModalOpen] =
    useState(false);

  const { totals, meals } = useMacroCalculation();

  useEffect(() => {
    if (type !== "planner") {
      setSelectedDate(dayjs(today).format("YYYY-MM-DD"));
      return;
    }
    setSelectedDate(dayjs(today).format("dddd"));
  }, [setSelectedDate, type]);

  const toggleOverlayMenuOpen = () => {
    setOverlayMenuOpen(!overlayMenuOpen);
  };

  const closeCopyModal = () => {
    setCopyModalOpen(false);
  };

  const toggleResetConfirmationModal = () => {
    setResetConfirmationModalOpen((prev) => !prev);
  };

  const resetCurrentDay = () => {
    editTrackedDay(dayjs().format("YYYY-MM-DD"), {
      foods: [],
    });
  };

  /* const { foods } = useFoodStore(({ foods }) => ({ foods })); */

  return (
    <>
      <div className="flex flex-col w-full h-full max-h-screen">
        <Summary {...totals} isPlanner={type === "planner"} />
        <TrackerList {...meals} />
        {copyModalOpen && <CopyDayModal onClose={closeCopyModal} />}
        {resetConfirmationModalOpen && (
          <ConfirmModal
            onClose={toggleResetConfirmationModal}
            onConfirm={() => {
              resetCurrentDay();
              toggleResetConfirmationModal();
              toggleOverlayMenuOpen();
            }}
          />
        )}
        {overlayMenuOpen && (
          <>
            <ModalOverlay onClick={toggleOverlayMenuOpen} />
            <div className="flex flex-col absolute bottom-[110px] right-[10px] gap-y-[3px] mb-[3px] items-end">
              <Button
                className="mx-0 min-w-[160px] font-semibold"
                onClick={() => {
                  setCopyModalOpen(true);
                  setOverlayMenuOpen(false);
                }}
              >
                Copy day
              </Button>
              <Button
                className="mx-0 min-w-[160px] font-semibold"
                onClick={() => {
                  toggleResetConfirmationModal();
                }}
              >
                Clear day
              </Button>
              <Button
                className="mx-0 min-w-[160px] font-semibold"
                onClick={() => {}}
              >
                Manage food store
              </Button>
            </div>
          </>
        )}

        {!copyModalOpen && (
          <button
            className="btn btn-circle btn-primary absolute bottom-[60px] right-[10px]"
            onClick={toggleOverlayMenuOpen}
          >
            <AiOutlineEdit style={{ width: "25px", height: "25px" }} />
          </button>
        )}
      </div>
    </>
  );
};

export default Tracker;
