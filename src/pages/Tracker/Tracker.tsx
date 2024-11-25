import { Button } from "@/components/common/Button";
import PageLayout from "@/components/layout/PageLayout";
import { ModalOverlay } from "@/components/ui/ModalOverlay";
import { useMacroCalculation } from "@/hooks/useMacroCalculation";
import { useTrackerStore } from "@/store/TrackerStore";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { AiOutlineClear, AiOutlineCopy, AiOutlineEdit } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import ClearDayModal from "./components/ClearDayModal";
import CopyDayModal from "./components/CopyDayModal";
import Summary from "./components/Summary";
import TrackerList from "./components/TrackerList";

const today = dayjs().format("YYYY-MM-DD");

type TrackerProps = {
  type: "tracker" | "planner";
};

const Tracker: FC<TrackerProps> = ({ type }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
    toggleResetConfirmationModal();
    toggleOverlayMenuOpen();
  };

  return (
    <PageLayout
      title={type === "tracker" ? "Daily Tracker" : "Meal Planner"}
      currentPath={pathname}
      sidebar={
        <>
          <div className="flex-1">
            <Summary {...totals} isPlanner={type === "planner"} />
          </div>
          <div className="p-4 border-t border-base-300 hidden lg:block w-full">
            <div className="flex flex-col gap-2">
              <button
                className="btn btn-sm btn-ghost justify-start gap-2 w-full"
                onClick={() => setCopyModalOpen(true)}
              >
                <AiOutlineCopy className="h-4 w-4" />
                Copy day
              </button>
              <button
                className="btn btn-sm btn-ghost justify-start gap-2 w-full"
                onClick={toggleResetConfirmationModal}
              >
                <AiOutlineClear className="h-4 w-4" />
                Clear day
              </button>
              <button
                className="btn btn-sm w-full"
                /* onClick={() => navigate("/settings")} */
              >
                Manage food store
              </button>
            </div>
          </div>
        </>
      }
    >
      <TrackerList {...meals} />

      {/* Mobile Actions */}
      {overlayMenuOpen && (
        <>
          <ModalOverlay onClick={toggleOverlayMenuOpen} />
          <div className="flex flex-col gap-2 fixed bottom-[80px] right-4 pb-14">
            <Button
              className="min-w-[160px] font-semibold"
              onClick={() => setCopyModalOpen(true)}
            >
              Copy day
            </Button>
            <Button
              className="min-w-[160px] font-semibold"
              onClick={toggleResetConfirmationModal}
            >
              Clear day
            </Button>
            <Button
              className="min-w-[160px] font-semibold"
              onClick={() => navigate("/settings")}
            >
              Manage food store
            </Button>
          </div>
        </>
      )}

      {!copyModalOpen && (
        <button
          className="btn btn-circle btn-primary fixed bottom-[80px] right-[10px] z-10 lg:hidden"
          onClick={toggleOverlayMenuOpen}
        >
          <AiOutlineEdit style={{ width: "25px", height: "25px" }} />
        </button>
      )}

      {/* Modals */}
      {copyModalOpen && <CopyDayModal onClose={closeCopyModal} />}
      {resetConfirmationModalOpen && (
        <ClearDayModal onClose={toggleResetConfirmationModal} />
      )}
    </PageLayout>
  );
};

export default Tracker;
