import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { FiLogOut } from "react-icons/fi";
import { FaGlobeAmericas } from "react-icons/fa";

const link =
  "px-3 py-2 rounded-md transition hover:bg-[#bb040f] hover:text-white";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const { t, i18n } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLangChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  return (
    <nav className="bg-[#d40511] text-white shadow mb-6">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-14 flex-wrap gap-y-2">
        <div className="flex items-center gap-x-6">

          <NavLink
            to="/"
            className="font-extrabold tracking-wide text-xl hover:text-[#fcedf0]"
          >
            {t("My DigiBank")}
          </NavLink>

          {user && (
            <ul className="flex gap-2">
              <NavLink to="/accounts" className={link}>
                {t("Accounts")}
              </NavLink>
              <NavLink to="/accounts/new" className={link}>
                {t("New Account")}
              </NavLink>
              <NavLink to="/account-types" className={link}>
                {t("Account Types")}
              </NavLink>
            </ul>
          )}
        </div>

        <div className="flex items-center gap-4">
          {location.pathname === "/" && (
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
          )}


          {user ? (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className={link + " flex items-center"}
            >
              <FiLogOut className="mr-1" /> {t("Logout")}
            </button>
          ) : (
            <ul className="flex gap-2">
              <NavLink to="/login" className={link}>
                {t("Login")}
              </NavLink>
              <NavLink to="/signup" className={link}>
                {t("Signup")}
              </NavLink>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
