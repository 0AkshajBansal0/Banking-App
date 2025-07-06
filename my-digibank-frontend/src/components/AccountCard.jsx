import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AccountCard({ account }) {
  const { t } = useTranslation();

  const isSavings = account.accountType.toLowerCase() === "savings";

  return (
    <Link
      to={`/accounts/${account.accountId}`}
      className="border rounded-xl p-5 shadow hover:shadow-lg transition cursor-pointer bg-white"
    >
      <h3 className="font-semibold text-lg mb-1">{account.accountHolderName}</h3>

      {/* Account Type translated */}
      <p className="text-sm text-gray-500 mb-2">{t(account.accountType.toLowerCase())}</p>

      {/* Badge with separate label and value */}
      <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mb-2">
        {isSavings ? (
          <>
            {t("interestLabel")}{" "}
            <strong>{t("interestValue", { rate: account.interestRate || 3 })}</strong>
          </>
        ) : (
          <>
            {t("overdraftLimitLabel")}{" "}
            <strong>{t("overdraftLimitValue", { limit: account.overdraftLimit || 50000 })}</strong>
          </>
        )}
      </span>

      {/* Balance */}
      <p className="font-medium">₹ {account.balance.toFixed(2)}</p>

      {/* Status translated */}
      <p className="text-xs mt-1 text-gray-500">{t(account.status.toLowerCase())}</p>
    </Link>
  );
}
