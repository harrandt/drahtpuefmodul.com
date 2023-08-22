import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { libResourcesToBackend } from '@oh/locales';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

i18n.use(initReactI18next)
    .use(I18nextBrowserLanguageDetector)
    .use(libResourcesToBackend())
    .init({
        supportedLngs: ['en', 'de', 'nl'],
        fallbackLng: 'en',
        defaultNS: 'app_restmaterial',
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });
