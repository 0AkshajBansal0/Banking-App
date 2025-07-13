import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { FaGlobeAmericas } from "react-icons/fa";

const linkClass =
  "px-3 py-2 rounded-md transition hover:bg-[#bb040f] hover:text-white";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLangChange = (e) => {
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  const LanguageDropdown = (
    <div className="relative group">
      <div className="absolute inset-y-0 left-2 flex items-center text-gray-500 pointer-events-none">
        <FaGlobeAmericas className="transition-transform group-hover:scale-110 group-hover:text-[#bb040f]" />
      </div>
      <select
        value={language}
        onChange={handleLangChange}
        className="appearance-none cursor-pointer bg-white text-black text-sm pl-8 pr-6 py-1 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d40511] hover:border-[#bb040f] transition-all duration-200 ease-in-out"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg fill='black' height='10' viewBox='0 0 24 24' width='10' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.5rem center",
          backgroundSize: "1rem",
        }}
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
        <option value="kn">ಕನ್ನಡ</option>
        <option value="ta">தமிழ்</option>
        <option value="gu">ગુજરાતી</option>
      </select>
    </div>
  );

  const AuthLinks = (
    <>
      <NavLink to="/login" className={linkClass}>
        {t("Login")}
      </NavLink>
      <NavLink to="/signup" className={linkClass}>
        {t("Signup")}
      </NavLink>
    </>
  );

  const UserLinks = (
    <>
      <NavLink to="/accounts" className={linkClass}>
        {t("Accounts")}
      </NavLink>
      <NavLink to="/accounts/new" className={linkClass}>
        {t("New Account")}
      </NavLink>
      <NavLink to="/account-types" className={linkClass}>
        {t("Account Types")}
      </NavLink>
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className={`${linkClass} flex items-center`}
      >
        <FiLogOut className="mr-1" /> {t("Logout")}
      </button>
    </>
  );

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav className="bg-[#d40511] text-white shadow mb-4 relative z-20">
        <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center h-14">
          <NavLink
            to="/"
            className="font-extrabold tracking-wide text-xl hover:text-[#fcedf0]"
          >
            {t("My DigiBank")}
          </NavLink>

          <div className="md:hidden text-2xl">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? UserLinks : AuthLinks}
            {location.pathname === "/" && LanguageDropdown}
          </div>
        </div>

        {menuOpen && (
          <div className="absolute w-full px-4 py-4 bg-[#d40511] z-20 md:hidden space-y-3">
            {user ? (
              <>
                <NavLink to="/accounts" className={linkClass + " block"}>
                  {t("Accounts")}
                </NavLink>
                <NavLink to="/accounts/new" className={linkClass + " block"}>
                  {t("New Account")}
                </NavLink>
                <NavLink to="/account-types" className={linkClass + " block"}>
                  {t("Account Types")}
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className={`${linkClass} flex items-center w-full`}
                >
                  <FiLogOut className="mr-1" /> {t("Logout")}
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClass + " block"}>
                  {t("Login")}
                </NavLink>
                <NavLink to="/signup" className={linkClass + " block"}>
                  {t("Signup")}
                </NavLink>
              </>
            )}

            {location.pathname === "/" && (
              <div className="pt-2">{LanguageDropdown}</div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
