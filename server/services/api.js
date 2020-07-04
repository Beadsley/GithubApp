const { request } = require('./httpClient.js');
process.env.NODE_ENV === 'development' && require('dotenv').config();
const { ApolloClient, HttpLink, InMemoryCache, split, gql } = require('@apollo/client');
const fetch = require('cross-fetch');

const { setContext } = require('apollo-link-context');
// const { getMainDefinition } = require('@apollo/client/utilities');
// const { WebSocketLink } = require('@apollo/link-ws');
console.log(process.env.TOKEN);

const authLink = setContext((_, { headers }) => {
  const token = process.env.TOKEN;
  return {
    headers: {
      ...headers,
      Authorization: token ? `bearer ${token}` : null,
    },
  };
});
// const wsLink = new WebSocketLink({
//   uri: `https://api.github.com/graphql`,
//   options: {
//     reconnect: true,
//   },
// });

const httpLink = new HttpLink({ uri: `https://api.github.com/graphql`, fetch });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const query = gql`
  {
    user(login: "beadsley") {
      name
      repositories(first: 100) {
        nodes {
          databaseId
          isPrivate
          name
          languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
              }
            }
            totalSize
          }
        }
      }
    }
  }
`;

const testy = async () => {
  const response = await client.query({ query });
  console.log(response);
};

const getGithubRepoData = async (username) => {
  return await request({
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      Authorization: `Basic ${process.env.TOKEN}`,
    },
  });
};

const getLanguageData = (repos) => {
  return repos.map((repo) => {
    return request({
      method: 'get',
      url: repo['languages_url'],
      headers: {
        Authorization: `Basic ${process.env.TOKEN}`,
      },
    });
  });
};
// https://api.github.com/graphql
const getUserInfo = async (username) => {
  return await request({
    method: 'get',
    url: `https://api.github.com/users/${username}`,
    headers: {
      Authorization: `Basic ${process.env.TOKEN}`,
    },
  });
};
module.exports = {
  getGithubRepoData,
  getLanguageData,
  getUserInfo,
  testy,
};
