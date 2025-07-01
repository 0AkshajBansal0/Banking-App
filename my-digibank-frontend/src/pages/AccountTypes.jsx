import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function AccountTypes() {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    api.get("/accounts/types").then((r) => setTypes(r.data));
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Account Types</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {types.map((t) => (
          <div key={t.type} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-1">{t.type}</h3>
            {t.interestRate && <p>Interest Rate: {t.interestRate}%</p>}
            {t.overdraftLimit && (
              <p>Overdraft Limit: ₹{t.overdraftLimit.toLocaleString()}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}