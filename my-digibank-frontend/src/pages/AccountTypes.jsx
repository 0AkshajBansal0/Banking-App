import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../services/api";

export default function AccountTypes() {
  const { t } = useTranslation();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function loadTypes() {
      try {
        const res = await api.get("/accounts/types");
        setTypes(res.data); // assuming array of account type objects
      } catch (err) {
        console.error("Failed to load account types", err);
      }
    }

    loadTypes();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t("accountTypesTitle")}</h2>

      {types.length === 0 ? (
        <p>{t("noAccountTypesFound")}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm bg-white rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border">{t("type")}</th>
                <th className="text-left p-3 border">{t("interestRate")}</th>
                <th className="text-left p-3 border">{t("overdraftLimit")}</th>
              </tr>
            </thead>
            <tbody>
              {types.map((type, i) => (
                <tr key={i}>
                  <td className="p-3 border">{type.type}</td>
                  <td className="p-3 border">
                    {type.interestRate ? `${type.interestRate}%` : t("na")}
                  </td>
                  <td className="p-3 border">
                    {type.overdraftLimit
                      ? `₹${type.overdraftLimit.toLocaleString()}`
                      : t("na")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}