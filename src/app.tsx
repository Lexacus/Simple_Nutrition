import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./app.css";
import TrackerPage from "./pages/TrackerPage";
import SettingsPage from "./pages/SettingsPage";
import { Footer } from "./components/layout/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TrackerPage />,
  },
  { path: "/settings", element: <SettingsPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
