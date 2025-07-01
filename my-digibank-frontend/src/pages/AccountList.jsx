import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    api
      .get("/accounts", {
        params: { type: type || undefined, status: status || undefined },
      })
      .then((r) => {
        setAccounts(r.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert("Failed to load accounts.");
      });
  };

  useEffect(load, [type, status]);

  const closeAccount = (id) => {
    if (!window.confirm("Are you sure you want to close this account?")) return;

    api
      .delete(`/accounts/${id}`)
      .then(() => {
        alert("Account closed successfully.");
        load();
      })
      .catch(() => alert("Failed to close account."));
  };

  /* ------------------- nicer tbody rendering (no nested ternary) ------------------- */
  let tableBody;

  if (loading) {
    tableBody = (
      <tr>
        <td colSpan="5" className="p-4 text-center">
          Loading…
        </td>
      </tr>
    );
  } else if (accounts.length === 0) {
    tableBody = (
      <tr>
        <td colSpan="5" className="p-4 text-center text-gray-500">
          No accounts found.
        </td>
      </tr>
    );
  } else {
    tableBody = accounts.map((a) => (
      <tr key={a.accountId} className="border-b hover:bg-gray-50">
        <td className="p-2">{a.accountHolderName}</td>
        <td className="p-2">{a.accountType}</td>
        <td className="p-2">₹{a.balance.toFixed(2)}</td>
        <td className="p-2">{a.status}</td>
        <td className="p-2 flex gap-2">
          <Link
            to={`/accounts/${a.accountId}`}
            className="text-blue-600 hover:text-blue-800"
          >
            View
          </Link>
          <button
            onClick={() => navigate(`/accounts/${a.accountId}/edit`)}
            className="text-yellow-600 hover:text-yellow-800"
          >
            Edit
          </button>
          {a.status !== "Closed" && (
            <button
              onClick={() => closeAccount(a.accountId)}
              className="text-red-600 hover:text-red-800"
            >
              Close
            </button>
          )}
        </td>
      </tr>
    ));
  }
  /* ------------------------------------------------------------------------------- */

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Accounts</h2>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Types</option>
          <option value="Savings">Savings</option>
          <option value="Checking">Checking</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Holder</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Balance</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      </div>
    </div>
  );
}