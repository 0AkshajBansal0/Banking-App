import { Link } from "react-router-dom";

export default function AccountCard({ account }) {
  const badge =
    account.accountType === "Savings"
      ? `Interest ${account.interestRate || 3}%`
      : `Overdraft ₹${account.overdraftLimit || 50000}`;

  return (
    <Link
      to={`/accounts/${account.accountId}`}
      className="border rounded-xl p-5 shadow hover:shadow-lg transition cursor-pointer bg-white"
    >
      <h3 className="font-semibold text-lg mb-1">
        {account.accountHolderName}
      </h3>
      <p className="text-sm text-gray-500 mb-2">{account.accountType}</p>
      <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mb-2">
        {badge}
      </span>
      <p className="font-medium">₹ {account.balance.toFixed(2)}</p>
      <p className="text-xs mt-1 text-gray-500">{account.status}</p>
    </Link>
  );
}