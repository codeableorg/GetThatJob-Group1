import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <MockedProvider>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  const linkElement = getByText(/Sign In/i);
  expect(linkElement).toBeInTheDocument();
});
