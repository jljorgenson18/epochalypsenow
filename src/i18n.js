import i18next from 'i18next';
import Cache from 'i18next-localstorage-cache';

const defaultLocale = 'en';

const getResources = localeName => {
  const resources = {
    en: {
      translation: require('../translations/en.json')
    }
  };
  if (localeName === 'en' || !localeName) {
    return resources;
  }
  return import(/* webpackChunkName: "translations/[request]" */ `../translations/${localeName}.json`)
    .catch(err =>
      import(/* webpackChunkName: "translations/[request]" */ `../translations/${
        localeName.split('-')[0]
      }.json`)
    )
    .catch(err => console.error(err))
    .then(response => {
      if (response) {
        resources[localeName] = {
          translation: response.default
        };
      }
      return resources;
    });
};

export const initialize = (locale = '') => {
  return getResources(locale).then(resources => {
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
  });
};

export default i18next;
