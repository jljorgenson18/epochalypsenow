import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import moment from 'moment-timezone';
import { I18nextProvider } from 'react-i18next';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import i18n, { initialize as i18nInitialize } from '../i18n/index';

const theme = createMuiTheme({
  palette: {},
  spacing: {
    unit: 8
  },
  typography: {}
});

const getLocale = () => {
  return navigator.language;
};

const loadMomentData = localeName => {
  // We already have it if we are english us
  if (localeName === 'en-US' || localeName === 'en') {
    return Promise.resolve();
  }
  return import(/* webpackChunkName: "moment-locales/[index]" */ `moment/locale/${localeName.toLowerCase()}.js`)
    .catch(err =>
      import(/* webpackChunkName: "moment-locales/[index]" */ `moment/locale/${
        localeName.split('-')[0]
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
          <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <CssBaseline>
                <App />
              </CssBaseline>
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </I18nextProvider>
      );
    }
    return null;
  }
}

export default hot(module)(Root);
