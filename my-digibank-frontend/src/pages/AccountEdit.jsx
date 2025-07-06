import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../services/api";

export default function AccountEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [account, setAccount] = useState(null);
  const [form, setForm] = useState({
    accountHolderName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    (async () => {
      const res = await api.get(`/accounts/${id}`);
      setAccount(res.data);
      setForm({
        accountHolderName: res.data.accountHolderName,
        email: res.data.email,
        phoneNumber: res.data.phoneNumber,
      });
    })();
  }, [id]);

  const isClosed = account?.status === "Closed";
  const isValid =
    form.accountHolderName &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    /^[0-9]{10}$/.test(form.phoneNumber);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await api.put(`/accounts/${id}`, {
      ...account,
      ...form,
    });
    navigate(`/accounts/${id}`);
  };

  if (!account)
    return <div className="text-center mt-10">{t("loadingAccount")}</div>;

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-white px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4 text-center text-blue-800">
          {t("editAccount")}
        </h2>

        {isClosed && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {t("accountClosedEditDisabled")}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("accountHolderName")}
            </label>
            <input
              name="accountHolderName"
              value={form.accountHolderName}
              onChange={handleChange}
              disabled={isClosed}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("email")}
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={isClosed}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("phoneNumber")}
            </label>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              disabled={isClosed}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                {t("status")}
              </label>
              <input
                value={account.status}
                disabled
                className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                {t("ifsc")}
              </label>
              <input
                value={account.ifsc}
                disabled
                className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isValid || isClosed}
            className={`w-full ${
              !isValid || isClosed
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 rounded transition`}
          >
            {t("saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
}