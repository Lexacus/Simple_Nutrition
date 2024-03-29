import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./app.css";
import TrackerPage from "./pages/TrackerPage";
import SettingsPage from "./pages/SettingsPage";
import { Footer } from "./components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
