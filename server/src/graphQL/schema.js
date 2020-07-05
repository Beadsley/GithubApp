const { gql } = require('apollo-server');

module.exports.typeDefs = gql`
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
