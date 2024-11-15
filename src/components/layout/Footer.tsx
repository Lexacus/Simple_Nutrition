import { useTrackerStore } from "@/store/TrackerStore";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineCalendar, AiOutlineSetting } from "react-icons/ai";

export const Footer = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { overlayMenuOpen } = useTrackerStore(({ overlayMenuOpen }) => ({
    overlayMenuOpen,
  }));

  if (!overlayMenuOpen) {
    return (
      <>
        {/* Mobile Footer */}
        <div className="lg:hidden btm-nav bg-base-200">
          <button 
            className={pathname === "/" ? "active" : ""} 
            onClick={() => navigate("/")}
          >
            <AiOutlineHome className="h-5 w-5" />
            <span className="btm-nav-label">Tracker</span>
          </button>
          
          <button 
            className={pathname === "/diet-plan" ? "active" : ""} 
            onClick={() => navigate("/diet-plan")}
          >
            <AiOutlineCalendar className="h-5 w-5" />
            <span className="btm-nav-label">Plan</span>
          </button>
          
          <button 
            className={pathname === "/settings" ? "active" : ""} 
            onClick={() => navigate("/settings")}
          >
            <AiOutlineSetting className="h-5 w-5" />
            <span className="btm-nav-label">Settings</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex h-12 bg-base-200 items-center justify-center gap-8 border-t border-base-300">
          <button 
            className={`btn btn-ghost btn-sm gap-2 min-w-[120px] ${pathname === "/" ? "btn-active" : ""}`}
            onClick={() => navigate("/")}
          >
            <AiOutlineHome className="h-4 w-4" />
            Tracker
          </button>
          <button 
            className={`btn btn-ghost btn-sm gap-2 min-w-[120px] ${pathname === "/diet-plan" ? "btn-active" : ""}`}
            onClick={() => navigate("/diet-plan")}
          >
            <AiOutlineCalendar className="h-4 w-4" />
            Plan
          </button>
          <button 
            className={`btn btn-ghost btn-sm gap-2 min-w-[120px] ${pathname === "/settings" ? "btn-active" : ""}`}
            onClick={() => navigate("/settings")}
          >
            <AiOutlineSetting className="h-4 w-4" />
            Settings
          </button>
        </div>
      </>
    );
  }
  return null;
};
