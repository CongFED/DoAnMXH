import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationVI from "./locales/vi/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVI,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Ngôn ngữ mặc định
  fallbackLng: "en", // Ngôn ngữ dự phòng nếu không tìm thấy ngôn ngữ yêu cầu
  interpolation: {
    escapeValue: false, // Vô hiệu hóa việc tự động escape các ký tự đặc biệt
  },
});

export default i18n;
