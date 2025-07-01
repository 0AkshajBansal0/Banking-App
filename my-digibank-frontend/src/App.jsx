import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./routes.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="p-4 bg-gray-100 min-h-screen">
        <AppRoutes />
      </main>
      <ToastContainer />
    </BrowserRouter>
  );
}
