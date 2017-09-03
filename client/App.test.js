import React from 'react';
import App from './App';

import renderer from 'react-test-renderer'; // eslint-disable-line import/first

/* eslint-disable react/jsx-filename-extension */
it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
/* eslint-enable react/jsx-filename-extension */
