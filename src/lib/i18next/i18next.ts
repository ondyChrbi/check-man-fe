import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import Backend from 'i18next-http-backend';

const DEFAULT_LANGUAGE = 'cs';

export default i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: DEFAULT_LANGUAGE,
        fallbackLng: DEFAULT_LANGUAGE,

        interpolation: {
            escapeValue: false
        }
    });