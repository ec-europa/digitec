/**
 * Create the store
 */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';

import schedule from './modules/schedule';

export default function configureStore() {
  const reducer = combineReducers({ schedule });

  const enhancers = [applyMiddleware(thunk), autoRehydrate()];

  if (process.env.NODE_ENV !== 'production') {
    const devtools = window.devToolsExtension || (() => noop => noop);
    enhancers.push(devtools());
  }

  const store = createStore(reducer, {}, compose(...enhancers));

  persistStore(store, {
    whitelist: ['schedule'],
  });

  return store;
}