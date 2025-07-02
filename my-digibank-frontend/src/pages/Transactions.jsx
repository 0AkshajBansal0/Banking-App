import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import dayjs from "dayjs";

export default function Transactions() {
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    minAmount: "",
    maxAmount: "",
    fromDate: "",
    toDate: "",
  });

  const quick = (range) => {
    const now = dayjs();
    if (range === "month") {
      setFilters((f) => ({
        ...f,
        fromDate: now.startOf("month").format("YYYY-MM-DD"),
        toDate: now.endOf("month").format("YYYY-MM-DD"),
      }));
    }
    if (range === "year") {
      setFilters((f) => ({
        ...f,
        fromDate: now.startOf("year").format("YYYY-MM-DD"),
        toDate: now.endOf("year").format("YYYY-MM-DD"),
      }));
    }
  };

  const load = async () => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
    ).toString();
    const res = await api.get(
      `/accounts/${id}/transactions${query ? `?${query}` : ""}`
    );
    setRows(res.data);
  };

  useEffect(() => {
    load();
  }, [filters]);

  const summary =
    filters.fromDate || filters.toDate
      ? `Showing ${filters.fromDate || "start"} → ${filters.toDate || "today"}`
      : "";

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>

      {/* Filter Section */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6 text-sm">
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full border px-2 py-1.5 rounded text-sm"
          >
            <option value="">All</option>
            <option>Debit</option>
            <option>Credit</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Min Amount</label>
          <input
            type="number"
            value={filters.minAmount}
            onChange={(e) =>
              setFilters({ ...filters, minAmount: e.target.value })
            }
            className="w-full border px-2 py-1.5 rounded text-sm"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Max Amount</label>
          <input
            type="number"
            value={filters.maxAmount}
            onChange={(e) =>
              setFilters({ ...filters, maxAmount: e.target.value })
            }
            className="w-full border px-2 py-1.5 rounded text-sm"
          />
        </div>

        {/* From & To Date in same row */}
        <div className="col-span-full flex gap-4 flex-wrap">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">From</label>
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) =>
                setFilters({ ...filters, fromDate: e.target.value })
              }
              className="border px-2 py-1.5 rounded text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">To</label>
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) =>
                setFilters({ ...filters, toDate: e.target.value })
              }
              className="border px-2 py-1.5 rounded text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-end gap-2 mt-auto">
            <button
              onClick={() => quick("month")}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1.5 rounded"
            >
              This Month
            </button>
            <button
              onClick={() => quick("year")}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1.5 rounded"
            >
              This Year
            </button>
            <button
              onClick={() =>
                setFilters((f) => ({ ...f, fromDate: "", toDate: "" }))
              }
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded"
            >
              Clear
            </button>
          </div>
        </div>
      </div>


      {summary && (
        <p className="text-sm text-gray-600 mb-4 italic">{summary}</p>
      )}

      {/* Transaction Cards */}
      <div className="grid gap-4">
        {rows.length === 0 && (
          <p className="text-gray-500 italic">No transactions found.</p>
        )}

        {rows.map((t) => (
          <div
            key={t.transactionId}
            className="bg-white border rounded-lg shadow-sm p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500">
                {t.dateOfTransaction}
              </p>
              <p className="text-lg font-medium">{t.description}</p>
              <p className="text-sm text-gray-600">{t.transactionType}</p>
            </div>
            <div
              className={`text-lg font-semibold ${t.transactionType === "Credit"
                  ? "text-green-600"
                  : "text-red-600"
                }`}
            >
              ₹{t.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}