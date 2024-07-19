import dayjs from "dayjs";
import { FC, useEffect } from "react";
import Summary from "../../components/summary/Summary";
import TrackerList from "../../components/trackerList/TrackerList";
import { useMacroCalculation } from "../../hooks/useMacroCalculation";
import { useTrackerStore } from "../../store/TrackerStore";

const today = dayjs().format("YYYY-MM-DD");

type TrackerProps = {
  type: "tracker" | "planner";
};

const Tracker: FC<TrackerProps> = ({ type }) => {
  const { setSelectedDate } = useTrackerStore(({ setSelectedDate }) => ({
    setSelectedDate,
  }));

  /*   const [overlayMenuOpen, setOverlayMenuOpen] = useState(false); */

  const { totals, meals } = useMacroCalculation({
    isPlanner: type === "planner",
  });

  useEffect(() => {
    if (type !== "planner") {
      setSelectedDate(dayjs(today).format("YYYY-MM-DD"));
      return;
    }
    setSelectedDate(dayjs(today).format("dddd"));
  }, [setSelectedDate, type]);

  /*   const toggleOverlayMenuOpen = () => {
    setOverlayMenuOpen((prev) => !prev);
  }; */

  return (
    <>
      <div className="flex flex-col w-full h-full max-h-screen">
        <Summary {...totals} isPlanner={type === "planner"} />
        <TrackerList {...meals} />
        {/* {addOverlayOpen && (
          <>
            <ModalOverlay
              onClick={toggleOverlayMenuOpen}
            />
            <div className="flex flex-col absolute bottom-[110px] right-[10px] gap-y-[3px] mb-[3px] items-end">
              <Button
                className="mx-0"
                onClick={}
              >
                Manage food store
              </Button>
            </div>
          </>
        )}

        <Button
          className="rounded-full w-[50px] h-[50px] absolute bottom-[60px] right-[10px]"
          onClick={toggleOverlayMenuOpen}
        >
          <AiOutlinePlus style={{ fontSize: "50px" }} />
        </Button> */}
      </div>
    </>
  );
};

export default Tracker;
