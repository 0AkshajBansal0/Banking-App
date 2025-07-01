import { useState } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

export default function CreateAccount() {
  const [form, setForm] = useState({
    accountHolderName: "",
    email: "",
    phoneNumber: "",
    ifsc: "",
    balance: "",
    accountType: "Savings",
    status: "Active", // ✅ required by backend
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation before submission
    if (!/^[0-9]{10}$/.test(form.phoneNumber)) {
      toast.error("Phone number must be 10 digits");
      return;
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc)) {
      toast.error("Invalid IFSC format");
      return;
    }

    try {
      const res = await api.post("/accounts", {
        ...form,
        balance: parseFloat(form.balance),
      });
      toast.success("Account created successfully!");
      setForm({
        accountHolderName: "",
        email: "",
        phoneNumber: "",
        ifsc: "",
        balance: "",
        accountType: "Savings",
        status: "Active",
      });
    } catch (err) {
      toast.error("Account creation failed.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="accountHolderName"
          placeholder="Account Holder Name"
          value={form.accountHolderName}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number (10 digits)"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="ifsc"
          placeholder="IFSC Code (e.g., ABCD0EFGH12)"
          value={form.ifsc}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          name="balance"
          placeholder="Initial Balance"
          value={form.balance}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <select
          name="accountType"
          value={form.accountType}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="Savings">Savings</option>
          <option value="Checking">Checking</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}