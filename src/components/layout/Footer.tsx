import { useLocation, useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleNavigate = (to: string) => () => {
    navigate(to);
  };

  return (
    <div
      role="tablist"
      className="absolute bottom-0 left-0 w-full tabs tabs-boxed"
    >
      <a
        role="tab"
        className={pathname === "/" ? "tab tab-active" : "tab"}
        onClick={handleNavigate("/")}
      >
        Tracker
      </a>
      <a
        role="tab"
        className={
          pathname === "/diet-plan" ? "tab tab-active [--tab-bg:blue]" : "tab"
        }
        onClick={handleNavigate("/diet-plan")}
      >
        Diet plan
      </a>
      <a
        role="tab"
        className={pathname === "/settings" ? "tab tab-active" : "tab"}
        onClick={handleNavigate("/settings")}
      >
        Settings
      </a>
    </div>
  );
};
