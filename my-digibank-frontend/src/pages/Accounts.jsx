import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [filters, setFilters] = useState({ type: "", status: "" });

  const fetchAccounts = async () => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
    ).toString();
    const res = await api.get("/accounts" + (query ? `?${query}` : ""));
    setAccounts(res.data);
  };

  useEffect(() => { fetchAccounts(); }, [filters]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Accounts</h2>
      <div className="flex gap-2 mb-4">
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="Savings">Savings</option>
          <option value="Checking">Checking</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
        </select>
        <button
          onClick={fetchAccounts}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
        >
          Apply
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <Link
            to={`/accounts/${acc.accountId}`}
            key={acc.accountId}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <p className="font-semibold">{acc.accountHolderName}</p>
            <p>{acc.accountType}</p>
            <p>₹ {acc.balance.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{acc.status}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
