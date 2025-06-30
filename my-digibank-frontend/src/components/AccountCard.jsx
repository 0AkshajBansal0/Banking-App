import { Link } from "react-router-dom";

const badge = (status) => ({
  Active: "bg-green-100 text-green-700",
  Closed: "bg-gray-100 text-gray-600",
  Frozen: "bg-red-100 text-red-700",
}[status] || "bg-yellow-100 text-yellow-700");

const AccountCard = ({ acc }) => (
  <div className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
    <div className="flex justify-between">
      <h3 className="font-semibold">{acc.accountHolderName}</h3>
      <span className={`px-2 py-1 rounded text-sm ${badge(acc.status)}`}>
        {acc.status}
      </span>
    </div>
    <p className="text-sm text-gray-500 mt-1">{acc.email}</p>
    <p className="mt-2">Balance: ₹{acc.balance.toLocaleString()}</p>
    <Link
      to={`/accounts/${acc.accountId}`}
      className="inline-block mt-3 text-blue-600 hover:underline"
    >
      View details →
    </Link>
  </div>
);

export default AccountCard;