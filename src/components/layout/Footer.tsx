import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../common/Button";

export const Footer = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  return (
    <div className="absolute flex flex-row bottom-[-2px] left-0 w-full py-[10px] bg-slate-800">
      <Button
        className={pathname === "/" ? "bg-red-600" : ""}
        onClick={() => {
          navigate("/");
        }}
      >
        Tracker
      </Button>
      <Button
        className={pathname === "/diet-plan" ? "bg-red-600" : ""}
        onClick={() => {
          navigate("/diet-plan");
        }}
      >
        Diet Plan
      </Button>
      <Button
        className={pathname === "/settings" ? "bg-red-600" : ""}
        onClick={() => {
          navigate("/settings");
        }}
      >
        Settings
      </Button>
    </div>
  );
};
