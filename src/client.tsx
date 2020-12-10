import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components/App';
import { Provider } from 'react-redux';
import * as serviceWorker from 'modules/serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/store';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

ReactDOM.hydrate(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register();
