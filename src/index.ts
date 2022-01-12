import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { createBets, createUsers } from './utils';
import  db  from '../models';

//createUsers();
//createBets();
const server = new ApolloServer({
    typeDefs, 
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({})
    ]
});

db.sequelize.sync().then(() => {
  server.listen().then(({url}:{url: String}) => {
    console.log(`Server listening at ${url}`);
  });
});

