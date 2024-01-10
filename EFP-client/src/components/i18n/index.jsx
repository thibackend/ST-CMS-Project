import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from "./translation/en.json";
import translationVN from "./translation/vn.json";



const options = {
  order: [ 'navigator', 'htmlTag', 'path', 'subdomain'],

  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], 

  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  htmlTag: document.documentElement,

  checkWhitelist: true
}

const resources = {
  en: {
    translation: translationEN
  },
  vn: {
    translation: translationVN
  }
};


const Language = ['en', 'vn'];
i18n
  .use(Backend)
 
  .use(LanguageDetector)
  .use(initReactI18next)
  
  .init({
  
    fallbackLng: 'en',
    debug: true,
    whitelist: Language,
    detection: options,
    interpolation: {
    escapeValue: false, 
    },
    resources
  });


export default i18n;