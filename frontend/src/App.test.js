import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache: new InMemoryCache(),
});

test('renders learn react link', () => {
  const { getByText } = render(
    <ApolloProvider client={client}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </ApolloProvider>
  );
  const linkElement = getByText(/Sign In/i);
  expect(linkElement).toBeInTheDocument();
});
