import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import store from './store';
import App from './components/App';
import './web-vitals';
import './index.scss';

ReactGA.initialize(import.meta.env.VITE_GA);
ReactGA.pageview('/');
ReactGA.set({
  appId: 'casbingo',
  appName: 'CS A Bingo',
  appVersion: import.meta.env.VITE_VERSION,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
