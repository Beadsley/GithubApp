const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const { getLanguageStatistics } = require('./controllers/statisticsController');
const { typeDefs } = require('./graphQL/schema');

const PORT = process.env.PORT || 8080;
const app = express();
process.env.NODE_ENV === 'production' && app.use(express.static(path.join(__dirname, '../../client/build')));

const resolvers = {
  Query: {
    languageStatistics: getLanguageStatistics,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
