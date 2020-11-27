import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components/App';
import { Provider } from 'react-redux';
import * as serviceWorker from 'modules/serviceWorker';
import { store } from './store/store';
import { fetchUser } from './store/actions/user';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

store.dispatch(fetchUser);

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register();
