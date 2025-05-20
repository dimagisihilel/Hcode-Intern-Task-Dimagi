import { ApolloServer, gql } from "apollo-server";
import { VehicleResolver } from "./resolvers/VehicleResolver";
import { AppDataSource } from "./ormconfig";
import * as fs from "fs";
import * as path from "path";

async function startServer() {
  await AppDataSource.initialize();

  const typeDefs = gql(fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"));

  const server = new ApolloServer({
    typeDefs,
    resolvers: VehicleResolver,
  });

  server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
