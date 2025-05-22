import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
//import { graphqlUploadExpress } from "graphql-upload";
// @ts-ignore
//import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
//import graphqlUploadExpress from 'graphql-upload/public/graphqlUploadExpress.js';
import { graphqlUploadExpress } from "graphql-upload-minimal";

import { AppDataSource } from "./config/data-source";
import { schema } from "./schema/index";
import { importQueue } from "./queues/importQueue";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  const app = express();

  app.use(graphqlUploadExpress()); // <--- enables file uploads

  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app });

  await AppDataSource.initialize();
  console.log("✅ DB Connected");

  app.listen(4002, () => {
    console.log("🚀 Server ready at http://localhost:4002/graphql");
  });
};

startServer();
