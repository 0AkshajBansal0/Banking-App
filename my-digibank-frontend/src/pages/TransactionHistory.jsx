import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";

export default function TransactionHistory() {
  const { id } = useParams();
  const [txns, setTxns] = useState([]);
  const [filter, setFilter] = useState("Monthly");
  const [type, setType] = useState("");

  useEffect(() => {
    api.get(`/transactions/account/${id}`).then((r) => setTxns(r.data));
  }, [id]);

  const now = new Date();
  const filtered = txns.filter((t) => {
    const d = new Date(t.dateOfTransaction);
    if (filter === "Monthly")
      if (
        d.getMonth() !== now.getMonth() ||
        d.getFullYear() !== now.getFullYear()
      )
        return false;
    if (filter === "Yearly" && d.getFullYear() !== now.getFullYear())
      return false;
    if (type && t.transactionType !== type) return false;
    return true;
  });

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">
        Transactions (Account #{id})
      </h2>

      <div className="flex gap-3 mb-3">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
          <option value="All">All</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Types</option>
          <option value="Debit">Debit</option>
          <option value="Credit">Credit</option>
        </select>
      </div>

      <div className="overflow-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              {["Txn ID", "Type", "Amount", "Date", "Description"].map((h) => (
                <th key={h} className="p-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.transactionId} className="border-b hover:bg-gray-50">
                <td className="p-2">{t.transactionId.slice(0, 8)}…</td>
                <td className="p-2">{t.transactionType}</td>
                <td className="p-2">₹{t.amount}</td>
                <td className="p-2">{t.dateOfTransaction}</td>
                <td className="p-2">{t.description}</td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No transactions
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}