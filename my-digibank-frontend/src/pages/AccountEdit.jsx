import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function AccountEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    accountHolderName: "",
    email: "",
    phoneNumber: "",
    ifsc: "",
    status: "Active",
  });

  const fetchAccount = async () => {
    const res = await api.get(`/accounts/${id}`);
    setForm(res.data);
  };

  useEffect(() => {
    fetchAccount();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await api.put(`/accounts/${id}`, form);
    navigate(`/accounts/${id}`);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Account</h2>

      <div className="space-y-3">
        <input
          name="accountHolderName"
          value={form.accountHolderName}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />

        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />

        <input
          name="ifsc"
          value={form.ifsc}
          onChange={handleChange}
          placeholder="IFSC Code"
          className="w-full p-2 border rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option>Active</option>
          <option>Frozen</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
        >
          ✅ Save Changes
        </button>
      </div>
    </div>
  );
}