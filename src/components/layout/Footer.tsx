import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute flex flex-row bottom-0 left-0 w-full py-[10px] bg-slate-800">
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Tracker
      </Button>
      <Button
        onClick={() => {
          navigate("/diet-plan");
        }}
      >
        Diet Plan
      </Button>
      <Button
        onClick={() => {
          navigate("/settings");
        }}
      >
        Settings
      </Button>
    </div>
  );
};
