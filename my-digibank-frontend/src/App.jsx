// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Accounts from "./pages/Accounts";
import NewAccount from "./pages/NewAccount";
import AccountDetails from "./pages/AccountDetails";
import AccountEdit from "./pages/AccountEdit";      // ← NEW
import Transactions from "./pages/Transactions";
import ProtectedRoute from "./routes/ProtectedRoute";
import AccountTypes from "./pages/AccountTypes";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <Routes>
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* protected routes */}
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

          {/* fallback */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}