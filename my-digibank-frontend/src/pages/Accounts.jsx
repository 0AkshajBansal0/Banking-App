import { useEffect, useState } from "react";
import api from "../services/api";
import AccountCard from "../components/AccountCard";
import FilterBar from "../components/FilterBar";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    status: "",
  });

  const load = async () => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
    ).toString();
    const res = await api.get("/accounts" + (query ? `?${query}` : ""));
    setAccounts(res.data);
  };


  //to reload the accounts when filters change
  useEffect(() => {
    load();
  }, [filters]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Accounts</h2>

      <FilterBar filters={filters} setFilters={setFilters} />

      {accounts.length === 0 && <p>No accounts found.</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <AccountCard key={acc.accountId} account={acc} />
        ))}
      </div>
    </div>
  );
}