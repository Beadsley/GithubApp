const { ApolloServer, gql } = require('apollo-server');
const { getLanguageStatistics } = require('./controllers/statisticsController');
const PORT = process.env.PORT || 8080;

const typeDefs = gql`
  type Language {
    name: String!
    sum: Int!
    fraction: Float!
    label: String!
  }
  type Languages {
    mostused: [Language!]!
    additional: [Language!]!
    total: Int!
  }
  type User {
    name: String!
    projects: Int!
    languages: Languages!
  }
  type Query {
    languageStatistics(username: String!): User
  }
`;

const resolvers = {
  Query: {
    languageStatistics: getLanguageStatistics,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
