import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-700 text-white px-6 py-4 shadow-md sticky top-0 z-50">
    <div className="flex justify-between items-center max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">💳 My DigiBank</h1>
      <ul className="flex gap-6">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/accounts">Accounts</Link></li>
        <li><Link to="/create">Create</Link></li>
      </ul>
    </div>
  </nav>
);

export default Navbar;