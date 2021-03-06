import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import createStore from './src/store/index';

/* eslint-disable import/prefer-default-export */
export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const store = createStore();

  const ConnectedBody = () => (
    /* eslint-disable react/jsx-filename-extension */
    <Provider store={store}>{bodyComponent}</Provider>
  );
  replaceBodyHTMLString(renderToString(<ConnectedBody />));
};
