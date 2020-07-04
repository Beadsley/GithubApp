process.env.NODE_ENV === 'development' && require('dotenv').config();
const { ApolloClient, HttpLink, InMemoryCache } = require('@apollo/client');
const fetch = require('cross-fetch');

const { setContext } = require('apollo-link-context');
const authLink = setContext((_, { headers }) => {
  const token = process.env.TOKEN;
  return {
    headers: {
      ...headers,
      Authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: `https://api.github.com/graphql`, fetch });

const request = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

module.exports = {
  request,
};
