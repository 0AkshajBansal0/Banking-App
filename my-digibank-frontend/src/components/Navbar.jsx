import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const linkClass = "px-3 py-2 hover:bg-blue-600 hover:text-white rounded-md transition";

  return (
    <nav className="bg-blue-500 text-white px-4 py-3 flex justify-between items-center shadow">
      <Link to="/" className="font-bold tracking-wide text-lg">
        DigiBank
      </Link>
      {user && (
        <ul className="flex gap-2">
          <NavLink to="/accounts" className={linkClass}>Accounts</NavLink>
          <NavLink to="/accounts/new" className={linkClass}>New Account</NavLink>
          <button onClick={logout} className={linkClass}>Logout</button>
        </ul>
      )}
      {!user && (
        <ul className="flex gap-2">
          <NavLink to="/login" className={linkClass}>Login</NavLink>
          <NavLink to="/signup" className={linkClass}>Signup</NavLink>
        </ul>
      )}
    </nav>
  );
}
