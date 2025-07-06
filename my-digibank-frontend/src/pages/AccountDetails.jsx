import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useTranslation } from "react-i18next";

export default function AccountDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [account, setAccount] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [form, setForm] = useState({ amount: "", currency: "INR", description: "" });
  const [msg, setMsg] = useState("");

  const loadAccount = async () => {
    const res = await api.get(`/accounts/${id}`);
    setAccount(res.data);
  };

  const loadCurrencies = async () => {
    try {
      const url = `${import.meta.env.VITE_EXCHANGE_API_BASE}/${import.meta.env.VITE_EXCHANGE_API_KEY}/codes`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.result === "success") {
        setCurrencies(data.supported_codes.map(([code, name]) => ({ code, name })));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAccount();
    loadCurrencies();
  }, [id]);

  const isClosed = account && account.status === "Closed";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const transact = async (type) => {
    if (isClosed) return;
    try {
      await api.post(`/accounts/${id}/${type}`, form);
      setMsg(t(`${type}Success`));
      setForm({ amount: "", currency: "INR", description: "" });
      loadAccount();
    } catch {
      setMsg(t(`${type}Failed`));
    }
  };

  const closeAccount = async () => {
    await api.delete(`/accounts/${id}`);
    navigate("/accounts");
  };

  if (!account) return <div className="text-center mt-10">{t("loading")}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Header + Action bar */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{account.accountHolderName}</h2>
        {!isClosed && (
          <div className="flex gap-2">
            <Link
              to={`/accounts/${id}/edit`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
            >
              {t("edit")}
            </Link>
            <button
              onClick={closeAccount}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
            >
              {t("close")}
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-700">
        {t("accountBalance")}: ₹ {account.balance.toFixed(2)}
      </p>
      <p className="text-gray-700">
        {t("accountStatus")}: {t(account.status.toLowerCase())}
      </p>

      <Link
        to={`/accounts/${id}/transactions`}
        className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
      >
        {t("viewTransactions")}
      </Link>

      {/* Debit / Credit */}
      <div className={`space-y-3 ${isClosed ? "opacity-50 pointer-events-none" : ""}`}>
        <h3 className="text-lg font-semibold">{t("transactTitle")}</h3>
        {msg && <p className="text-green-600">{msg}</p>}

        <input
          name="amount"
          type="number"
          placeholder={t("amount")}
          value={form.amount}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          disabled={isClosed}
        />

        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          disabled={isClosed}
        >
          {currencies.map(({ code, name }) => (
            <option key={code} value={code}>
              {code} — {name}
            </option>
          ))}
        </select>

        <input
          name="description"
          placeholder={t("description")}
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          disabled={isClosed}
        />

        <div className="flex gap-2">
          <button
            onClick={() => transact("debit")}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
            disabled={isClosed}
          >
            {t("debit")}
          </button>
          <button
            onClick={() => transact("credit")}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            disabled={isClosed}
          >
            {t("credit")}
          </button>
        </div>
      </div>

      {isClosed && (
        <p className="text-sm text-red-600 mt-4">{t("closedMessage")}</p>
      )}
    </div>
  );
}
