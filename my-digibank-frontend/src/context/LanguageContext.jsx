import { useEffect, useState } from "react";
import { LanguageContext } from "./LanguageContextValue";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
