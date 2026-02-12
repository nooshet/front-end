import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { translations } from "../constant/translations";
import { getLocales } from "expo-localization";

const STORE_LANGUAGE_KEY = "settings.lang";

const languageDetector = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async function (callback) {
    try {
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
        if (language) {
          return callback(language);
        } else {
          const deviceLanguage = getLocales()[0].languageCode;
          return callback(deviceLanguage);
        }
      });
    } catch (error) {
      console.log("Error reading language", error);
    }
  },
  cacheUserLanguage: async function (language) {
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {}
  },
};

const resources = {
  az: {
    translation: translations.az,
  },
  en: {
    translation: translations.en,
  },
  ru: {
    translation: translations.ru,
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    resources,
    fallbackLng: "az",
    compatibilityJSON: "v3",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
