import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AccountDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [form, setForm] = useState({ amount: 0, currency: "INR", description: "" });
  const [message, setMessage] = useState("");

  const fetchAccount = async () => {
    const res = await api.get(`/accounts/${id}`);
    setAccount(res.data);
  };

  useEffect(() => { fetchAccount(); }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleTransaction = async (type) => {
    try {
      await api.post(`/accounts/${id}/${type}`, form);
      setMessage(`${type} successful`);
      setForm({ amount: 0, currency: "INR", description: "" });
      fetchAccount();
    } catch {
      setMessage(`${type} failed`);
    }
  };

  const handleClose = async () => {
    await api.delete(`/accounts/${id}`);
    navigate("/accounts");
  };

  if (!account) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{account.accountHolderName}</h2>
      <p className="mb-2">Balance: ₹ {account.balance.toFixed(2)}</p>
      <p className="mb-4">Status: {account.status}</p>
      <div className="flex gap-2 mb-4">
        <button onClick={handleClose} className="bg-red-600 text-white px-4 py-1 rounded">Close Account</button>
        <Link to={`/accounts/${id}/transactions`} className="bg-gray-600 text-white px-4 py-1 rounded">Transactions</Link>
      </div>

      <h3 className="font-semibold mb-2">Debit / Credit</h3>
      {message && <p className="mb-2">{message}</p>}
      <div className="space-y-2">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          {["INR", "USD", "EUR"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <div className="flex gap-2">
          <button onClick={() => handleTransaction("debit")} className="flex-1 bg-yellow-500 text-white py-2 rounded">Debit</button>
          <button onClick={() => handleTransaction("credit")} className="flex-1 bg-green-600 text-white py-2 rounded">Credit</button>
        </div>
      </div>
    </div>
  );
}
