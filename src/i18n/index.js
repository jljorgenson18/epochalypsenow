import i18next from 'i18next';
import Cache from 'i18next-localstorage-cache';

import en from './en';

console.log(en);

const getResources = locale => {
  const resources = {
    en: {
      translation: en
    }
  };
  if (locale === 'en-US' || locale === 'en') {
    return Promise.resolve(resources);
  }
  return import(/* webpackChunkName: "i18n-locales/[index]" */ `./${locale}.json`)
    .catch(err => {
      return import(/* w bpackChunkName: "i18n-locales/[index]" */ `./${
        locale.split('-')[0]
      }.json`);
    })
    .catch(err => console.log(err))
    .then(localeModule => {
      if (localeModule) {
        resources[locale] = {
          translation: localeModule.default
        };
      }
      return resources;
    });
};

export const initialize = locale => {
  return getResources(locale).then(resources => {
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
