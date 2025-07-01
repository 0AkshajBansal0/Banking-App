import { NavLink } from "react-router-dom";

const link =
  "hover:text-yellow-300 transition cursor-pointer px-2 py-1 rounded";

export default function Navbar() {
  return (
    <nav className="bg-blue-800 text-white flex gap-4 items-center px-4 py-3">
      <h1 className="font-bold text-lg mr-4">My DigiBank</h1>

      <NavLink to="/dashboard" className={link}>
        Dashboard
      </NavLink>
      <NavLink to="/accounts" className={link}>
        Accounts
      </NavLink>
      <NavLink to="/accounts/create" className={link}>
        New&nbsp;Account
      </NavLink>
      <NavLink to="/transactions/new" className={link}>
        New&nbsp;Txn
      </NavLink>
      <NavLink to="/accounts/types" className={link}>Types</NavLink>
    </nav>
  );
}