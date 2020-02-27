import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
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

it('bottom nav renders', () => {
  let container;
  act(() => {
    container = render(<BottomNav />);
  });
  expect(container.textContent).toBe('FOOTER');
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
