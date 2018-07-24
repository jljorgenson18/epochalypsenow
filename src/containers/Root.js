import React, { Component } from 'react';
// import { IntlProvider, addLocaleData } from 'react-intl';
import { hot } from 'react-hot-loader';
import moment from 'moment-timezone';
import { I18nextProvider } from 'react-i18next';

import App from './App';
import i18n, { initialize as i18nInitialize } from '../i18n/index';

const getLocale = () => {
  return 'fr-CH'; //navigator.language;
};

const loadMomentData = localName => {
  // We already have it if we are english us
  if (localName === 'en-US' || localName === 'en') {
    return Promise.resolve();
  }
  return import(/* webpackChunkName: "moment-locales/[index]" */ `moment/locale/${localName.toLowerCase()}.js`)
    .catch(err =>
      import(/* webpackChunkName: "moment-locales/[index]" */ `moment/locale/${
        localName.split('-')[0]
      }.js`)
    )
    .catch(err => console.error(err));
};

class Root extends Component {
  constructor(props) {
    super(props);
    const locale = getLocale();
    this.state = { i18nInitialized: false, locale };
    this.initializeI18n(locale);
  }
  initializeI18n = locale => {
    return Promise.all([loadMomentData(locale), i18nInitialize(locale)]).then(
      () => {
        moment.locale(locale);
        this.setState({
          i18nInitialized: true
        });
      }
    );
  };
  render() {
    const { i18nInitialized } = this.state;
    if (i18nInitialized) {
      return (
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      );
    }
    return null;
  }
}

export default hot(module)(Root);
