const { gql } = require('@apollo/client');
const { request } = require('./httpClient');

const query = (username) => gql`
  {
    user(login: "${username}") {
      name
      repositories(first: 100) {
        totalCount
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

const getLanguageData = async (username) => {
  const response = await request.query({ query: query(username) });
  return response;
};

module.exports = {
  getLanguageData,
};
