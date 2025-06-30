import { useEffect, useState } from "react";
import { fetchAccounts } from "../api/accountApi";

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, active: 0, balance: 0 });

  useEffect(() => {
    fetchAccounts().then((res) => {
      const accs = res.data;
      const active = accs.filter((a) => a.status === "Active").length;
      const balance = accs.reduce((sum, a) => sum + a.balance, 0);
      setStats({ total: accs.length, active, balance });
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
      <StatCard label="Total Accounts" value={stats.total} />
      <StatCard label="Active Accounts" value={stats.active} />
      <StatCard label="Total Balance (₹)" value={stats.balance.toLocaleString()} />
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white p-6 rounded shadow text-center">
    <p className="text-gray-500">{label}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default Dashboard;