import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const HTTP_ENDPOINT = 'http://localhost:4000/api';

// Create an HTTP link to the Phoenix app's HTTP endpoint URL.
const httpLink = createHttpLink({
  uri: HTTP_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create a link that "splits" requests based on GraphQL operation type.
// Queries and mutations go through the HTTP link.
// Subscriptions go through the WebSocket link.
const link = authLink.concat(httpLink);

// Create the Apollo Client instance.
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
