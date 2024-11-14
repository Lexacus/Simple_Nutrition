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
      <div className="btm-nav bg-base-200">
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
    );
  }
  return null;
};
