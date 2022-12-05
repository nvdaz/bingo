import { configureStore } from '@reduxjs/toolkit';
import * as reducer from './features';

const stored = localStorage.getItem('state');

let preloadedState;
if (stored) {
  try {
    preloadedState = JSON.parse(stored);
  } catch (e) {
    console.error(e);
  }
}

const store = configureStore({
  reducer,
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
