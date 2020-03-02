import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

// This should literally never fail.
test('two plus two is four', () => {
  expect(2+2).toBe(4);
});
