import { useEffect, useState } from "react";
import api from "../services/api";

export default function AccountTypes() {
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
      <h2 className="text-2xl font-bold mb-6">Account Types</h2>

      {types.length === 0 ? (
        <p>No account types found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm bg-white rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border">Type</th>
                <th className="text-left p-3 border">Interest Rate</th>
                <th className="text-left p-3 border">Overdraft Limit</th>
              </tr>
            </thead>
            <tbody>
              {types.map((t, i) => (
                <tr key={i}>
                  <td className="p-3 border">{t.type}</td>
                  <td className="p-3 border">
                    {t.interestRate ? `${t.interestRate}%` : "N/A"}
                  </td>
                  <td className="p-3 border">
                    {t.overdraftLimit
                      ? `₹${t.overdraftLimit.toLocaleString()}`
                      : "N/A"}
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