import { ApolloServer, gql } from 'apollo-server';
import { importResolver } from './resolvers/importResolver';
import { AppDataSource } from './data-source';

AppDataSource.initialize().then(() => {
  const typeDefs = gql`
    scalar Upload
    type Mutation {
      importVehicles(file: Upload!): Boolean
    }
  `;

  const server = new ApolloServer({
    typeDefs,
    resolvers: importResolver,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});
