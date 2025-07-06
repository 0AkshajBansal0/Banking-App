import "./i18n";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Accounts from "./pages/Accounts";
import NewAccount from "./pages/NewAccount";
import AccountDetails from "./pages/AccountDetails";
import AccountEdit from "./pages/AccountEdit";
import Transactions from "./pages/Transactions";
import ProtectedRoute from "./routes/ProtectedRoute";
import AccountTypes from "./pages/AccountTypes";

import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      
    <AuthProvider>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/accounts"
            element={
              <ProtectedRoute>
                <Accounts />
              </ProtectedRoute>
            }
            />
          <Route
            path="/accounts/new"
            element={
              <ProtectedRoute>
                <NewAccount />
              </ProtectedRoute>
            }
            />
          <Route
            path="/accounts/:id"
            element={
              <ProtectedRoute>
                <AccountDetails />
              </ProtectedRoute>
            }
            />
          <Route
            path="/account-types"
            element={
              <ProtectedRoute>
                <AccountTypes />
              </ProtectedRoute>
            }
            />
          <Route
            path="/accounts/:id/edit"
            element={
              <ProtectedRoute>
                <AccountEdit />
              </ProtectedRoute>
            }
            />
          <Route
            path="/accounts/:id/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
            />


          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </AuthProvider>
            </LanguageProvider>
  );
}