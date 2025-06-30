const TransactionRow = ({ tx }) => (
  <tr className="border-b">
    <td className="py-2 px-3">{tx.transactionType}</td>
    <td className="py-2 px-3">₹{tx.amount.toLocaleString()}</td>
    <td className="py-2 px-3">{tx.description}</td>
    <td className="py-2 px-3">{tx.dateOfTransaction}</td>
  </tr>
);

export default TransactionRow;