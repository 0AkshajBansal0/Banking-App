import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

export default function AccountDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const [account, setAccount] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ email: "", phoneNumber: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/accounts/${id}`);
        setAccount(res.data);
        setForm({ email: res.data.email, phoneNumber: res.data.phoneNumber });
      } catch (err) {
        console.error("Failed to fetch account", err);
        toast.error("Failed to load account details");
      }
    };

    fetchData();
  }, [id]);
  
  const save = async () => {
    try {
      await api.put(`/accounts/${id}`, { ...account, ...form });
      toast.success("Contact info updated");
      setEditing(false);
      // Reload updated details
      const res = await api.get(`/accounts/${id}`);
      setAccount(res.data);
    } catch {
      toast.error("Update failed");
    }
  };

  const closeAcc = async () => {
    if (!window.confirm("Close account?")) return;
    await api.delete(`/accounts/${id}`);
    toast.success("Account closed");
    nav("/accounts");
  };

  if (!account) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Account Details</h2>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <div><strong>Name:</strong> {account.accountHolderName}</div>
        <div><strong>Type:</strong> {account.accountType}</div>
        <div><strong>Balance:</strong> ₹{account.balance.toFixed(2)}</div>
        <div><strong>Status:</strong> {account.status}</div>

        {/* Editable */}
        <div>
          <strong>Email:</strong>{" "}
          {editing ? (
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border p-1 rounded"
            />
          ) : (
            account.email
          )}
        </div>
        <div>
          <strong>Phone:</strong>{" "}
          {editing ? (
            <input
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
              className="border p-1 rounded"
            />
          ) : (
            account.phoneNumber
          )}
        </div>
      </div>

      <div className="flex gap-3">
        {editing ? (
          <>
            <button
              onClick={save}
              className="bg-green-600 text-white px-4 py-1 rounded cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-500 text-white px-4 py-1 rounded cursor-pointer"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={closeAcc}
              disabled={account.status !== "Active"}
              className={`px-4 py-1 rounded text-white ${account.status === "Active"
                  ? "bg-red-600 hover:bg-red-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Close
            </button>
          </>
        )}

        <Link
          to={`/accounts/${id}/transactions`}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded cursor-pointer"
        >
          Transactions
        </Link>
      </div>
    </div>
  );
}