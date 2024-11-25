import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineSetting,
} from "react-icons/ai";

interface PageLayoutProps {
  children: ReactNode;
  currentPath: string;
  sidebar?: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({
  children,
  currentPath,
  sidebar,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-[100dvh] overflow-hidden">
      <div className="hidden lg:flex flex-1 overflow-hidden">
        <div className="w-[350px] border-r border-base-300 flex flex-col p-[0.75rem] border-b">
          <h1 className="text-lg font-bold">Simple Nutrition</h1>
          <nav className="flex flex-col gap-1.5">
            <button
              className={`btn btn-ghost justify-start gap-2 h-10 min-h-[2.5rem] ${
                currentPath === "/" ? "btn-active" : ""
              }`}
              onClick={() => navigate("/")}
            >
              <AiOutlineHome className="h-5 w-5" />
              Daily Tracker
            </button>
            <button
              className={`btn btn-ghost justify-start gap-2 h-10 min-h-[2.5rem] ${
                currentPath === "/diet-plan" ? "btn-active" : ""
              }`}
              onClick={() => navigate("/diet-plan")}
            >
              <AiOutlineCalendar className="h-5 w-5" />
              Meal Planner
            </button>
            <button
              className={`btn btn-ghost justify-start gap-2 h-10 min-h-[2.5rem] ${
                currentPath === "/settings" ? "btn-active" : ""
              }`}
              onClick={() => navigate("/settings")}
            >
              <AiOutlineSetting className="h-5 w-5" />
              Settings
            </button>
          </nav>

          {sidebar && (
            <div className="flex-1 flex flex-col overflow-y-auto border-t border-base-300">
              {sidebar}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto pt-[1rem] max-w-3xl mx-auto flex flex-col overflow-hidden">
          {children}
        </div>
      </div>

      <div className="lg:hidden flex flex-col h-full overflow-hidden">
        {sidebar && <div className="flex-none">{sidebar}</div>}

        <div className="flex-1 overflow-y-auto pb-24">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
