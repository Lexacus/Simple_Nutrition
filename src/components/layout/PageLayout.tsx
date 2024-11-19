import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineCalendar, AiOutlineSetting } from "react-icons/ai";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  currentPath: string;
  sidebar?: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children, title, currentPath, sidebar }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-[100dvh] overflow-hidden">
      {/* Layout Desktop */}
      <div className="hidden lg:flex flex-1 overflow-hidden">
        {/* Sidebar sinistra con navigazione e summary */}
        <div className="w-[350px] border-r border-base-300 flex flex-col">
          {/* Desktop Nav */}
          <div className="p-3 border-b border-base-300">
            <div className="flex items-center gap-2 mb-4">
              <h1 className="text-lg font-bold">Simple Nutrition</h1>
            </div>
            <nav className="flex flex-col gap-1.5">
              <button
                className={`btn btn-ghost justify-start gap-2 h-10 min-h-[2.5rem] ${currentPath === "/" ? "btn-active" : ""}`}
                onClick={() => navigate("/")}
              >
                <AiOutlineHome className="h-5 w-5" />
                Daily Tracker
              </button>
              <button
                className={`btn btn-ghost justify-start gap-2 h-10 min-h-[2.5rem] ${currentPath === "/diet-plan" ? "btn-active" : ""}`}
                onClick={() => navigate("/diet-plan")}
              >
                <AiOutlineCalendar className="h-5 w-5" />
                Meal Planner
              </button>
              <button
                className={`btn btn-ghost justify-start gap-2 h-10 min-h-[2.5rem] ${currentPath === "/settings" ? "btn-active" : ""}`}
                onClick={() => navigate("/settings")}
              >
                <AiOutlineSetting className="h-5 w-5" />
                Settings
              </button>
            </nav>
          </div>

          {/* Sidebar Content */}
          {sidebar && (
            <div className="flex-1 flex flex-col overflow-y-auto">
              {sidebar}
            </div>
          )}
        </div>

        {/* Area principale desktop */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="max-w-3xl mx-auto">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Mobile */}
      <div className="lg:hidden flex flex-col h-full overflow-hidden">
        {/* Header Mobile */}
        {/* <div className="navbar bg-base-100 border-b border-base-200 flex-none">
          <div className="flex-1">
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
        </div> */}

        {/* Sidebar Content Mobile */}
        {sidebar && (
          <div className="flex-none">
            {sidebar}
          </div>
        )}

        {/* Contenuto Mobile */}
        <div className="flex-1 overflow-y-auto">
          <div className="pb-24">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
