import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import createStore from './src/store/index';

exports.onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  if (typeof window.IntersectionObserver === 'undefined') {
    /* eslint-disable global-require */
    require('intersection-observer');
    // console.log('👍 IntersectionObserver is polyfilled');
  }

  // Object-fit/Object-position polyfill for gatsby-image (IE)
  const testImg = document.createElement('img');
  if (
    typeof testImg.style.objectFit === 'undefined' ||
    typeof testImg.style.objectPosition === 'undefined'
  ) {
    /* eslint-disable global-require */
    require('object-fit-images')();
    // console.log('👍 Object-fit/Object-position are polyfilled');
  }
};

exports.replaceRouterComponent = ({ history }) => {
  const store = createStore();

  /* eslint-disable react/prop-types */
  const ConnectedRouterWrapper = ({ children }) => (
    /* eslint-disable react/jsx-filename-extension */
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  return ConnectedRouterWrapper;
};
