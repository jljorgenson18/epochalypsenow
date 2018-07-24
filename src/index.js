import React from 'react';
import ReactDOM from 'react-dom';

import './Polyfills';

import Root from './containers/Root';

ReactDOM.render(<Root />, document.getElementById('app'));

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => console.log('Service Worker registered successfully.'))
    .catch(err => console.error(err));
}
