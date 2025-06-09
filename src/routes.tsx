import { createBrowserRouter, Outlet } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { ToastContainer } from "react-toastify";
import Tracker from "./pages/Tracker/Tracker";
import SettingsPage from "./pages/Settings/Settings";
import Layout from "./components/layout/Layout";

export const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Outlet />
        <Footer />
        <ToastContainer />
      </Layout>
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
