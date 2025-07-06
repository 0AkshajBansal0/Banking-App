import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  const features = [
    { title: t("Create & Manage Accounts"), desc: t("Open, edit or close savings/checking accounts securely.") },
    { title: t("Multi-Currency Support"), desc: t("Transact in INR, USD, EUR and more with live rates.") },
    { title: t("Language Selection"), desc: t("Use DigiBank in Hindi, Tamil, Kannada, Gujarati & more.") },
    { title: t("Secure Transactions"), desc: t("Track real-time credits and debits with time stamps.") },
    { title: t("Clean UI & Filters"), desc: t("Filter transactions by type, amount and date easily.") },
    { title: t("Fully Responsive"), desc: t("Access your account across devices with smooth UX.") },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-white text-center">
      {/* Hero Section */}
      <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
        {t("Welcome to DigiBank")}
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl mb-8">
        {t("Your smart and secure digital banking experience starts here.")}
      </p>

      <div className="flex gap-4 mb-10 flex-wrap justify-center">
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition shadow"
        >
          {t("Login")}
        </Link>
        <Link
          to="/signup"
          className="bg-gray-200 hover:bg-gray-300 text-blue-800 px-6 py-3 rounded-md transition shadow"
        >
          {t("Signup")}
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="border border-gray-200 p-6 rounded-lg shadow hover:shadow-lg transition-transform transform hover:-translate-y-1 bg-white"
          >
            <h3 className="text-lg font-semibold text-blue-700 mb-2">{f.title}</h3>
            <p className="text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
