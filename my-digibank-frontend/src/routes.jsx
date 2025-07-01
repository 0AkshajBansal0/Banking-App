import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import AccountList from "./pages/AccountList.jsx";
import CreateAccount from "./pages/CreateAccount.jsx";
import AccountDetails from "./pages/AccountDetails.jsx";
import EditAccount from "./pages/EditAccount.jsx";
import AccountTypes from "./pages/AccountTypes.jsx";
import RecordTransaction from "./pages/RecordTransaction.jsx";
import TransactionHistory from "./pages/TransactionHistory.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redirect to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Account-related pages */}
      <Route path="/accounts" element={<AccountList />} />
      <Route path="/accounts/create" element={<CreateAccount />} />
      <Route path="/accounts/:id" element={<AccountDetails />} />
      <Route path="/accounts/:id/edit" element={<EditAccount />} />
      <Route path="/accounts/types" element={<AccountTypes />} />
      <Route path="/accounts/:id/transactions" element={<TransactionHistory />} />

      {/* Transaction-related */}
      <Route path="/transactions/new" element={<RecordTransaction />} />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}