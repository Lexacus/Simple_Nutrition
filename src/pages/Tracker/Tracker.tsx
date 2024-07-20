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

const today = dayjs().format("YYYY-MM-DD");

type TrackerProps = {
  type: "tracker" | "planner";
};

const Tracker: FC<TrackerProps> = ({ type }) => {
  const { setSelectedDate } = useTrackerStore(({ setSelectedDate }) => ({
    setSelectedDate,
  }));

  const [overlayMenuOpen, setOverlayMenuOpen] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);

  const { totals, meals } = useMacroCalculation();

  useEffect(() => {
    if (type !== "planner") {
      setSelectedDate(dayjs(today).format("YYYY-MM-DD"));
      return;
    }
    setSelectedDate(dayjs(today).format("dddd"));
  }, [setSelectedDate, type]);

  const toggleOverlayMenuOpen = () => {
    setOverlayMenuOpen((prev) => !prev);
  };

  const closeCopyModal = () => {
    setCopyModalOpen(false);
  };

  /* const { foods } = useFoodStore(({ foods }) => ({ foods })); */

  return (
    <>
      <div className="flex flex-col w-full h-full max-h-screen">
        <Summary {...totals} isPlanner={type === "planner"} />
        <TrackerList {...meals} />
        {copyModalOpen && <CopyDayModal onClose={closeCopyModal} />}
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
                onClick={() => {}}
              >
                Manage food store
              </Button>
            </div>
          </>
        )}

        {!copyModalOpen && (
          <Button
            className="rounded-full w-[50px] h-[50px] absolute bottom-[60px] right-[10px]"
            onClick={toggleOverlayMenuOpen}
          >
            <AiOutlineEdit style={{ fontSize: "50px" }} />
          </Button>
        )}
      </div>
    </>
  );
};

export default Tracker;
