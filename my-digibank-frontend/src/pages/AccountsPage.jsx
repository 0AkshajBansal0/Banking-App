import { useEffect, useState } from "react";
import { fetchAccounts } from "../api/accountApi";
import AccountCard from "../components/AccountCard";

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchAccounts().then((res) => setAccounts(res.data));
  }, []);

  const filtered = accounts.filter(
    (a) =>
      (type ? a.accountType === type : true) &&
      (status ? a.status === status : true)
  );

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Accounts</h2>

      <div className="flex gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          <option>Savings</option>
          <option>Checking</option>
        </select>
        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option>Active</option>
          <option>Closed</option>
          <option>Frozen</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((acc) => (
          <AccountCard key={acc.accountId} acc={acc} />
        ))}
      </div>
    </div>
  );
};

export default AccountsPage;