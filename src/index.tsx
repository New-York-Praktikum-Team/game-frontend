import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components/App';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import * as serviceWorker from 'serviceWorker';

ReactDOM.render(<StrictMode><App /></StrictMode>, document.getElementById('root'));

serviceWorker.register();
