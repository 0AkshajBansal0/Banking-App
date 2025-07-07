import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { FiLogOut } from "react-icons/fi";
import { FaGlobeAmericas } from "react-icons/fa";

const link = "px-3 py-2 rounded-md transition hover:bg-blue-600 hover:text-white";

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
    <nav className="bg-blue-500 text-white shadow mb-6">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-14">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="font-extrabold tracking-wide text-xl">
            {t("My DigiBank")}
          </NavLink>

          {location.pathname === "/" && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-gray-500">
                <FaGlobeAmericas />
              </div>
              <select
                value={language}
                onChange={handleLangChange}
                className="appearance-none bg-white text-black text-sm pl-8 pr-6 py-1 rounded-md border focus:outline-none"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="ta">தமிழ்</option>
                <option value="gu">ગુજરાતી</option>
              </select>
            </div>
          )}
        </div>

        {user ? (
          <ul className="flex gap-2 items-center">
            <NavLink to="/accounts" className={link}>
              {t("Accounts")}
            </NavLink>
            <NavLink to="/accounts/new" className={link}>
              {t("New Account")}
            </NavLink>
            <NavLink to="/account-types" className={link}>
              {t("Account Types")}
            </NavLink>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className={link + " flex items-center"}
            >
              <FiLogOut className="mr-1" /> {t("Logout")}
            </button>
          </ul>
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
    </nav>
  );
}