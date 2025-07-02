import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function Transactions() {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    minAmount: "",
    maxAmount: "",
    fromDate: "",
    toDate: "",
  });

  const fetchTransactions = async () => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
    ).toString();
    const res = await api.get(`/accounts/${id}/transactions${query ? `?${query}` : ""}`);
    setTransactions(res.data);
  };

  useEffect(() => { fetchTransactions(); }, []);

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        <select name="type" value={filters.type} onChange={handleChange} className="border p-2 rounded">
          <option value="">All Types</option>
          <option value="Debit">Debit</option>
          <option value="Credit">Credit</option>
        </select>
        <input type="number" name="minAmount" placeholder="Min" value={filters.minAmount} onChange={handleChange} className="border p-2 rounded" />
        <input type="number" name="maxAmount" placeholder="Max" value={filters.maxAmount} onChange={handleChange} className="border p-2 rounded" />
        <input type="date" name="fromDate" value={filters.fromDate} onChange={handleChange} className="border p-2 rounded" />
        <input type="date" name="toDate" value={filters.toDate} onChange={handleChange} className="border p-2 rounded" />
        <button onClick={fetchTransactions} className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition col-span-1 sm:col-span-2 lg:col-span-1">
          Apply
        </button>
      </div>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Amount (₹)</th>
            <th className="border px-2 py-1">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.transactionId}>
              <td className="border px-2 py-1">{t.dateOfTransaction}</td>
              <td className="border px-2 py-1">{t.transactionType}</td>
              <td className="border px-2 py-1">{t.amount.toFixed(2)}</td>
              <td className="border px-2 py-1">{t.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
