import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewAccount() {
  const navigate = useNavigate();
  const [accountTypes, setAccountTypes] = useState([]);
  const [form, setForm] = useState({
    accountHolderName: "",
    accountType: "",
    balance: "",
    email: "",
    phoneNumber: "",
    ifsc: "",
  });
  const [typeDetails, setTypeDetails] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const isValid = () => {
    return (
      form.accountHolderName &&
      form.accountType &&
      /^\d+(\.\d{1,2})?$/.test(form.balance) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      /^[0-9]{10}$/.test(form.phoneNumber) &&
      /^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc)
    );
  };

  useEffect(() => {
    axios.get("http://localhost:8080/accounts/types").then((res) => {
      setAccountTypes(res.data);
    });
  }, []);

  useEffect(() => {
    const type = accountTypes.find((t) => t.type === form.accountType);
    if (type) setTypeDetails(type);
  }, [form.accountType, accountTypes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/accounts", {
        ...form,
        status: "Active",
      });
      navigate("/accounts");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Open New Account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded shadow"
      >
        <div>
          <label>Name</label>
          <input
            type="text"
            name="accountHolderName"
            value={form.accountHolderName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {touched.accountHolderName && !form.accountHolderName && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        <div>
          <label>Account Type</label>
          <select
            name="accountType"
            value={form.accountType}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">--Select--</option>
            {accountTypes.map((t) => (
              <option key={t.type} value={t.type}>
                {t.type}
              </option>
            ))}
          </select>
          {form.accountType && (
            <p className="text-xs text-gray-600 mt-1">
              {form.accountType === "Savings"
                ? `Interest Rate: ${typeDetails.interestRate}%`
                : `Overdraft Limit: ₹${typeDetails.overdraftLimit}`}
            </p>
          )}
        </div>

        <div>
          <label>Initial Balance</label>
          <input
            type="number"
            name="balance"
            value={form.balance}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {touched.balance && !/^\d+(\.\d{1,2})?$/.test(form.balance) && (
            <span className="text-red-500 text-sm">Invalid amount</span>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
            <span className="text-red-500 text-sm">Invalid email</span>
          )}
        </div>

        <div>
          <label>Phone Number</label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {touched.phoneNumber && !/^[0-9]{10}$/.test(form.phoneNumber) && (
            <span className="text-red-500 text-sm">Invalid phone</span>
          )}
        </div>

        <div>
          <label>IFSC Code</label>
          <input
            name="ifsc"
            value={form.ifsc}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {touched.ifsc && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc) && (
            <span className="text-red-500 text-sm">Invalid IFSC</span>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid()}
          className={`w-full ${
            isValid()
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          } text-white py-2 rounded transition`}
        >
          Create Account
        </button>
      </form>
    </div>
  );
}