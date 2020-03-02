import { unmountComponentAtNode } from 'react-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import BottomNav from './BottomNav';

// Setup and teardown
let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  render(
    <MemoryRouter>
      <BottomNav />
    </MemoryRouter>,
    container
  );

});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('navigates home when Home is selected', async => {

  act(() => {
    const link = document.querySelector('#home');
    link.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  expect(location.pathname).toBe('/home');
});

test('navigates to add-a-plant when Add a Plant is selected', async => {
  
  act(() => {
    const link = document.querySelector('#add-plant');
    link.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  expect(location.pathname).toBe('/add-plant');
});

test('navigates to Monitor when Monitor is selected', async => {
  
  act(() => {
    const link = document.querySelector('#monitor');
    link.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  expect(location.pathname).toBe('/monitor');
});

test('navigates to Options when Options is selected', async => {
  
  act(() => {
    const link = document.querySelector('#options');
    link.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  expect(location.pathname).toBe('/options');
});

/*
// Check that it redirects to the home page.
test("redirects to home page", () => {
    // Render the app
    render(
      <MemoryRouter initialEntries={['/initial_route']}>
        <BottomNav />
      </MemoryRouter>,
      root
    );

    // Interact with the app
    act(() => {
      const homeLink = document.querySelector('#home-button');
      homeLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Check result
    expect(document.body.textContent).toBe("/home");
}); */
