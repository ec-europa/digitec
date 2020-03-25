import React from 'react';
import { Provider } from 'react-redux';

import createStore from './src/store/index';

const onClientEntry = () => {
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

const wrapRootElement = ({ element }) => {
  const store = createStore();

  /* eslint-disable react/jsx-filename-extension */
  const ConnectedRootElement = <Provider store={store}>{element}</Provider>;

  return ConnectedRootElement;
};

export { onClientEntry, wrapRootElement };
