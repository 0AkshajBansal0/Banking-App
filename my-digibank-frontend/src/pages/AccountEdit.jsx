// src/pages/AccountEdit.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function AccountEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [form, setForm] = useState({
    accountHolderName: "",
    email: "",
    phoneNumber: "",
  });

  /* ---------- fetch account once ---------- */
  useEffect(() => {
    (async () => {
      const res = await api.get(`/accounts/${id}`);
      setAccount(res.data);
      setForm({
        accountHolderName: res.data.accountHolderName,
        email: res.data.email,
        phoneNumber: res.data.phoneNumber,
      });
    })();
  }, [id]);

  /* ---------- helpers ---------- */
  const isClosed = account?.status === "Closed";
  const isValid =
    form.accountHolderName &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    /^[0-9]{10}$/.test(form.phoneNumber);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await api.put(`/accounts/${id}`, {
      ...account, // keep uneditable fields intact
      ...form,
    });
    navigate(`/accounts/${id}`);
  };

  if (!account)
    return <div className="text-center mt-10">Loading account…</div>;

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-white px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4 text-center text-blue-800">
          Edit Account
        </h2>

        {isClosed && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
            This account is <b>Closed</b>. Edits are disabled.
          </div>
        )}

        <div className="space-y-4">
          {/* Editable Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Holder Name
            </label>
            <input
              name="accountHolderName"
              value={form.accountHolderName}
              onChange={handleChange}
              disabled={isClosed}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={isClosed}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              disabled={isClosed}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Read‑only Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Status</label>
              <input
                value={account.status}
                disabled
                className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">IFSC</label>
              <input
                value={account.ifsc}
                disabled
                className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSubmit}
            disabled={!isValid || isClosed}
            className={`w-full ${
              !isValid || isClosed
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 rounded transition`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}