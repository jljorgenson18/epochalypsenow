import i18next from 'i18next';
import Cache from 'i18next-localstorage-cache';

const defaultLocale = 'en';

const getResources = () => {
  // So we can skip the require.context
  if (process.env.NODE_ENV === 'test') {
    return {
      en: {
        translation: require('./en.json')
      }
    };
  }
  const localeContext = require.context('./', false, /\.json$/);
  return localeContext.keys().reduce((resources, localeFile) => {
    const localeName = localeFile.replace(/\.json/g, '').replace(/\.\//g, '');
    resources[localeName] = {
      translation: localeContext(localeFile)
    };
    return resources;
  }, {});
};

const resources = getResources();

export const initialize = (locale = '') => {
  locale = locale.replace(/_/g, '-');
  // Falling back to the top level language if it is not available
  if (!resources[locale]) {
    locale = locale.split('-')[0];
  }
  if (!resources[locale]) {
    locale = defaultLocale;
  }
  return new Promise((resolve, reject) => {
    i18next.use(Cache).init(
      {
        lng: locale,
        debug: process.env.NODE_ENV === 'development',
        fallbackLng: 'en',
        resources: resources,
        interpolation: {
          escapeValue: false
        },
        react: {
          wait: false // We do this ourself
        }
      },
      (err, t) => {
        if (err) {
          reject(err);
        }
        resolve(t);
      }
    );
  });
};

export default i18next;
