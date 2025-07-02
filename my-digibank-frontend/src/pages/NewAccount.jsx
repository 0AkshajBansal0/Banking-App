import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function NewAccount() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    accountHolderName: "",
    accountType: "Savings",
    balance: 0,
    email: "",
    phoneNumber: "",
    ifsc: "",
    status: "Active",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/accounts", form);
      navigate("/accounts");
    } catch {
      setError("Failed to create account");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create New Account</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        {[
          { label: "Holder Name", name: "accountHolderName", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone (10 digits)", name: "phoneNumber", type: "text" },
          { label: "IFSC", name: "ifsc", type: "text" },
          { label: "Initial Balance", name: "balance", type: "number" },
        ].map((f) => (
          <input
            key={f.name}
            type={f.type}
            name={f.name}
            placeholder={f.label}
            value={form[f.name]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        ))}
        <select
          name="accountType"
          value={form.accountType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Savings">Savings</option>
          <option value="Checking">Checking</option>
        </select>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Create
        </button>
      </form>
    </div>
  );
}
