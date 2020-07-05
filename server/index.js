const { ApolloServer } = require('apollo-server');
const { getLanguageStatistics } = require('./controllers/statisticsController');
const { typeDefs } = require('./graphQL/schema');
const PORT = process.env.PORT || 8080;

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
