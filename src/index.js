import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.render(
  <>
    <AppProvider i18n={enTranslations}>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </>,
  document.getElementById('root')
);
