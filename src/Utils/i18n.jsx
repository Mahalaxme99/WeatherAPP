import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';\
import * as RNLocalize from 'react-native-localize';
import en from './locales/en.json';
import ar from './locales/ar.json';
import jp from './locales/jp.json';
import es from './locales/es.json';
import ge from './locales/ge.json';

const resources = {
    en: { translation: en },
    ar: { translation: ar },
    jp: { translation: jp },  
    es: { translation: es },
    ge: { translation: ge }
};

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async () => {
        const language = await AsyncStorage.getItem('userLanguage');
        if (language) return language;
        const locales = RNLocalize.getLocales();
        return locales[0]?.languageCode || 'en';
    },
    init: () => { },
    cacheUserLanguage: (language) => {
        AsyncStorage.setItem('userLanguage', language);
    },
};

i18n
    .use(initReactI18next)
    .use(languageDetector)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
