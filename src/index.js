import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auth from "./Auth";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Auth />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
