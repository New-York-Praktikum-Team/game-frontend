import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components/App';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      // eslint-disable-next-line no-console
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      // eslint-disable-next-line no-console
      console.log('SW registration failed: ', registrationError);
    });
  });
}

ReactDOM.render(<StrictMode><App /></StrictMode>, document.getElementById('root'));
