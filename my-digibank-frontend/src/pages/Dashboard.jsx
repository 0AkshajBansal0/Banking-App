import { useEffect, useState } from "react";
import axios from "../api/axiosConfig.js";

export default function Dashboard() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get("/accounts").then((r) => setAccounts(r.data));
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="bg-white p-4 rounded shadow space-y-1">
        <p>Total Accounts: {accounts.length}</p>
      </div>
    </>
  );
}