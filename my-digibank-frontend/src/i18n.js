import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import hi from "./locales/hi/translation.json";
import kn from "./locales/kn/translation.json";
import ta from "./locales/ta/translation.json";
import gu from "./locales/gu/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: { en:{translation:en}, hi:{translation:hi}, kn:{translation:kn}, ta:{translation:ta}, gu:{translation:gu} },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
