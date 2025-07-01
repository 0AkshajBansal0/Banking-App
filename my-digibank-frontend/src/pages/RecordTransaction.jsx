import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";

export default function RecordTransaction() {
  const nav = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [type, setType] = useState("Debit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/accounts").then((r) => {
      setAccounts(r.data);
      if (r.data[0]) setAccountId(r.data[0].accountId);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/accounts/${accountId}/${type.toLowerCase()}`, {
        amount: parseFloat(amount),
        description,
      });
      toast.success("Transaction recorded");
      nav(`/accounts/${accountId}/transactions`);
    } catch (err) {
      toast.error("Transaction failed");
    }
    setLoading(false);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Record Transaction</h2>
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded shadow max-w-md space-y-3"
      >
        <select
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {accounts.map((a) => (
            <option key={a.accountId} value={a.accountId}>
              {a.accountHolderName} ({a.accountId.slice(0, 6)}…)
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option>Debit</option>
          <option>Credit</option>
        </select>

        <input
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
}