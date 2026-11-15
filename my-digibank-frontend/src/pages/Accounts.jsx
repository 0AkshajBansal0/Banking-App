import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import AccountCard from "../components/AccountCard";
import FilterBar from "../components/FilterBar";

export default function Accounts() {
  const { t } = useTranslation();
  const [accounts, setAccounts] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    status: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
      ).toString();
      const res = await api.get("/accounts" + (query ? `?${query}` : ""));
      if (active) {
        setAccounts(res.data);
        setError("");
      }
    };

    load().catch((error) => {
      console.error("Failed to load accounts", error);
      if (active) setError(t("accountsLoadFailed"));
    });

    return () => {
      active = false;
    };
  }, [filters, t]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t("accountsTitle")}</h2>

      <FilterBar filters={filters} setFilters={setFilters} />

      {error && <p className="text-red-600" role="alert">{error}</p>}
      {!error && accounts.length === 0 && <p>{t("noAccountsFound")}</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <AccountCard key={acc.accountId} account={acc} />
        ))}
      </div>
    </div>
  );
}