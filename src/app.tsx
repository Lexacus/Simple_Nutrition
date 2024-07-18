import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./app.css";
import TrackerPage from "./pages/Tracker/Tracker";
import SettingsPage from "./pages/Settings/Settings";
import { Footer } from "./components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DietPlanPage from "./pages/DietPlanPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    element: (
      <>
        <Outlet />
        <Footer />
        <ToastContainer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <TrackerPage />,
      },
      { path: "/settings", element: <SettingsPage /> },
      { path: "diet-plan", element: <DietPlanPage /> },
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
