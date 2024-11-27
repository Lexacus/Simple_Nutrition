import { useTrackerStore } from "@/store/TrackerStore";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AiFillSignal,
  AiOutlineCalendar,
  AiOutlineSetting,
} from "react-icons/ai";
import { cn } from "@/utils";

export const Footer = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleNavigate = (to: string) => () => {
    navigate(to);
  };

  const { overlayMenuOpen } = useTrackerStore(({ overlayMenuOpen }) => ({
    overlayMenuOpen,
  }));

  if (!overlayMenuOpen) {
    return (
      <div
        role="tablist"
        className="absolute bottom-0 left-0 w-full tabs tabs-boxed"
      >
        <a
          role="tab"
          className={cn(
            "flex gap-x-[5px]",
            pathname === "/" ? "tab tab-active" : "tab"
          )}
          onClick={handleNavigate("/")}
        >
          <AiFillSignal className="h-4 w-4" />
          Tracker
        </a>
        <a
          role="tab"
          className={cn(
            "flex gap-x-[5px]",
            pathname === "/diet-plan" ? "tab tab-active [--tab-bg:blue]" : "tab"
          )}
          onClick={handleNavigate("/diet-plan")}
        >
          <AiOutlineCalendar className="h-4 w-4" />
          Planner
        </a>
        <a
          role="tab"
          className={cn(
            "flex gap-x-[5px]",
            pathname === "/settings" ? "tab tab-active" : "tab"
          )}
          onClick={handleNavigate("/settings")}
        >
          <AiOutlineSetting className="h-4 w-4" />
          Settings
        </a>
      </div>
    );
  }
  return <></>;
};
