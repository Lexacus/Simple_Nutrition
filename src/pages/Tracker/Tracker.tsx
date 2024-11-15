import { Button } from "@/components/common/Button";
import { ModalOverlay } from "@/components/ui/ModalOverlay";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineHome, AiOutlineCalendar, AiOutlineSetting, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useMacroCalculation } from "@/hooks/useMacroCalculation";
import { useTrackerStore } from "@/store/TrackerStore";
import Summary from "./components/Summary";
import TrackerList from "./components/TrackerList";
import CopyDayModal from "./components/CopyDayModal";
import ConfirmModal from "@/components/confirmModal/ConfirmModal";
import { useSettingsStore } from "@/store/SettingsStore";
import { useNavigate } from "react-router-dom";

const today = dayjs().format("YYYY-MM-DD");

type TrackerProps = {
  type: "tracker" | "planner";
};

const Tracker: FC<TrackerProps> = ({ type }) => {
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col w-full h-[100dvh]">
      {/* Layout Desktop */}
      <div className="hidden lg:flex flex-1">
        {/* Sidebar sinistra con navigazione e summary */}
        <div className="w-[300px] border-r border-base-300 flex flex-col">
          {/* Desktop Nav */}
          <div className="p-4 border-b border-base-300">
            <div className="flex items-center gap-2 mb-6">
              <h1 className="text-xl font-bold">Simple Nutrition</h1>
            </div>
            <nav className="flex flex-col gap-2">
              <button 
                className={`btn btn-ghost justify-start gap-2 ${type === "tracker" ? "btn-active" : ""}`}
                onClick={() => navigate("/")}
              >
                <AiOutlineHome className="h-5 w-5" />
                Daily Tracker
              </button>
              <button 
                className={`btn btn-ghost justify-start gap-2 ${type === "planner" ? "btn-active" : ""}`}
                onClick={() => navigate("/diet-plan")}
              >
                <AiOutlineCalendar className="h-5 w-5" />
                Meal Planner
              </button>
              <button 
                className="btn btn-ghost justify-start gap-2"
                onClick={() => navigate("/settings")}
              >
                <AiOutlineSetting className="h-5 w-5" />
                Settings
              </button>
            </nav>
          </div>

          {/* Summary e Actions */}
          <div className="flex-1 overflow-y-auto p-4">
            <Summary {...totals} isPlanner={type === "planner"} />
            
            <div className="mt-6">
              <div className="card bg-base-200">
                <div className="card-body p-3">
                  <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
                  <div className="flex flex-col gap-2">
                    <button 
                      className="btn btn-sm w-full"
                      onClick={() => setCopyModalOpen(true)}
                    >
                      Copy day
                    </button>
                    <button 
                      className="btn btn-sm w-full"
                      onClick={toggleResetConfirmationModal}
                    >
                      Clear day
                    </button>
                    <button 
                      className="btn btn-sm w-full"
                      onClick={() => navigate("/settings")}
                    >
                      Manage food store
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Area principale */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              <TrackerList {...meals} />
            </div>
          </div>
        </div>
      </div>

      {/* Layout Mobile (esistente) */}
      <div className="lg:hidden flex flex-col h-full">
        <div className="flex-none">
          <Summary {...totals} isPlanner={type === "planner"} />
        </div>
        <div className="flex-1 overflow-y-auto pb-24">
          <TrackerList {...meals} />
        </div>

        {/* Mobile Actions */}
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
            className="btn btn-circle btn-primary fixed bottom-[80px] right-[10px] z-10"
            onClick={toggleOverlayMenuOpen}
          >
            <AiOutlineEdit style={{ width: "25px", height: "25px" }} />
          </button>
        )}
      </div>

      {/* Modals */}
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
    </div>
  );
};

export default Tracker;
