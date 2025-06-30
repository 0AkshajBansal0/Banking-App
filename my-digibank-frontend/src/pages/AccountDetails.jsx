import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchAccountById,
  debitAccount,
  creditAccount,
} from "../api/accountApi";
import { fetchTransactionsByAccount } from "../api/transactionApi";
import TransactionRow from "../components/TransactionRow";

const AccountDetails = () => {
  const { accountId } = useParams();
  const [acc, setAcc] = useState(null);
  const [txs, setTxs] = useState([]);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [mode, setMode] = useState("Credit");

  const loadAll = () => {
    fetchAccountById(accountId).then((r) => setAcc(r.data));
    fetchTransactionsByAccount(accountId).then((r) => setTxs(r.data));
  };

  useEffect(loadAll, [accountId]);

  const submitTx = () => {
    const body = { amount: Number(amount), description: desc };
    const fn = mode === "Credit" ? creditAccount : debitAccount;
    fn(accountId, body)
      .then(loadAll)
      .catch(() => alert("Transaction failed"));
  };

  if (!acc) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Account Details</h2>
      <div className="bg-white p-6 rounded shadow mb-6">
        <p><b>Name:</b> {acc.accountHolderName}</p>
        <p><b>Type:</b> {acc.accountType}</p>
        <p><b>Balance:</b> ₹{acc.balance.toLocaleString()}</p>
        <p><b>Status:</b> {acc.status}</p>
      </div>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">New {mode}</h3>
        <div className="flex gap-3 mb-3">
          <select value={mode} onChange={(e) => setMode(e.target.value)}
                  className="border p-2 rounded">
            <option>Credit</option>
            <option>Debit</option>
          </select>
          <input type="number" className="border p-2 rounded flex-1"
                 placeholder="Amount" value={amount}
                 onChange={(e) => setAmount(e.target.value)} />
          <input type="text" className="border p-2 rounded flex-1"
                 placeholder="Description" value={desc}
                 onChange={(e) => setDesc(e.target.value)} />
          <button onClick={submitTx}
                  className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2">Transactions</h3>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-3 text-left">Type</th>
            <th className="py-2 px-3 text-left">Amount</th>
            <th className="py-2 px-3 text-left">Description</th>
            <th className="py-2 px-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {txs.map((t) => <TransactionRow key={t.transactionId} tx={t} />)}
        </tbody>
      </table>
    </div>
  );
};

export default AccountDetails;