import ReactDOM, { unmountComponentAtNode } from 'react-dom';
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
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('navigates home when Home is selected', async => {
  const root = document.createElement('div');
  document.body.appendChild(root);

  render(
    <MemoryRouter>
      <BottomNav />
    </MemoryRouter>,
    root
  );

  act(() => {
    const link = document.querySelector('#home');
    link.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  expect(document.textContent).toBe('Home');
});

test('navigates to add-a-plant when Add a Plant is selected', async => {
  const root = document.createElement('div');
  document.body.appendChild(root);

  render(
    <MemoryRouter>
      <BottomNav />
    </MemoryRouter>,
    root
  );

  act(() => {
    const link = document.querySelector('#add-plant');
    link.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  expect(document.textContent).toBe('Add a Plant');
});

test('navigates to Monitor when Monitor is selected', async => {
  const root = document.createElement('div');
  document.body.appendChild(root);

  render(
    <MemoryRouter>
      <BottomNav />
    </MemoryRouter>,
    root
  );

  act(() => {
    const link = document.querySelector('#monitor');
    link.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  expect(document.textContent).toBe('Monitor');
});

test('navigates to Options when Options is selected', async => {
  const root = document.createElement('div');
  document.body.appendChild(root);

  render(
    <MemoryRouter>
      <BottomNav />
    </MemoryRouter>,
    root
  );

  act(() => {
    const link = document.querySelector('#options');
    link.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  expect(document.textContent).toBe('options');
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
