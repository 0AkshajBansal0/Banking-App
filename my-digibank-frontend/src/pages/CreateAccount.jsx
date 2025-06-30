import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../api/accountApi";

const CreateAccount = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    accountHolderName: "", email: "", phoneNumber: "",
    ifsc: "", balance: 0, accountType: "Savings"
  });

  const handle = () => {
    createAccount({ ...form, status: "Active" })
      .then(() => nav("/accounts"))
      .catch(() => alert("Failed to create"));
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Account</h2>
      {["accountHolderName", "email", "phoneNumber", "ifsc", "balance"].map((f) => (
        <input key={f}
          className="w-full border p-2 mb-3 rounded"
          placeholder={f}
          value={form[f]}
          onChange={(e) => setForm({ ...form, [f]: e.target.value })}
          type={f === "balance" ? "number" : "text"}
        />
      ))}
      <select
        className="w-full border p-2 mb-4 rounded"
        value={form.accountType}
        onChange={(e) => setForm({ ...form, accountType: e.target.value })}
      >
        <option>Savings</option>
        <option>Checking</option>
      </select>
      <button onClick={handle}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Create
      </button>
    </div>
  );
};

export default CreateAccount;