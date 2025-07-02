import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

const link =
  "px-3 py-2 rounded-md transition hover:bg-blue-600 hover:text-white";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 text-white shadow mb-6">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-14">
        <NavLink to="/" className="font-extrabold tracking-wide">
          DigiBank
        </NavLink>

        {user && (
          <ul className="flex gap-2">
            <NavLink to="/accounts" className={link}>
              Accounts
            </NavLink>
            <NavLink to="/accounts/new" className={link}>
              New Account
            </NavLink>
            <NavLink to="/account-types" className={link}>
              Account Types
            </NavLink>
            <button onClick={logout} className={link + " flex items-center"}>
              <FiLogOut className="mr-1" /> Logout
            </button>
          </ul>
        )}

        {!user && (
          <ul className="flex gap-2">
            <NavLink to="/login" className={link}>
              Login
            </NavLink>
            <NavLink to="/signup" className={link}>
              Signup
            </NavLink>
          </ul>
        )}
      </div>
    </nav>
  );
}