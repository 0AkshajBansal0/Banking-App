import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AccountsPage from "./pages/AccountsPage";
import CreateAccount from "./pages/CreateAccount";
import LoginPage from "./pages/LoginPage";

import AccountDetails from "./pages/AccountDetails";


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/accounts/:accountId" element={<AccountDetails />} />  {/* NEW */}
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;