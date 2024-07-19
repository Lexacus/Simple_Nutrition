import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import { Footer } from "./components/layout/Footer";
import SettingsPage from "./pages/Settings/Settings";
import Tracker from "./pages/Tracker/Tracker";

const router = createBrowserRouter([
  {
    element: (
      <div className="flex flex-col">
        <Outlet />
        <Footer />
        <ToastContainer />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Tracker type="tracker" />,
      },
      { path: "/settings", element: <SettingsPage /> },
      { path: "diet-plan", element: <Tracker type="planner" /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
