import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {SettingsStateProvider} from "./contexts/settingsState"
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <SettingsStateProvider>
    <App />
    </SettingsStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


