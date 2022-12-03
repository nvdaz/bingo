import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom/client';
import App from './App';
import './web-vitals';
import './index.scss';

ReactGA.initialize(import.meta.env.VITE_GA, { debug: import.meta.env.DEV });
ReactGA.pageview('/');
ReactGA.set({
  appId: 'casbingo',
  appName: 'CS A Bingo',
  appVersion: import.meta.env.VITE_VERSION,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
