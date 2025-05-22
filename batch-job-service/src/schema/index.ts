import { makeExecutableSchema } from "@graphql-tools/schema";
//import { GraphQLUpload } from "graphql-upload";
// @ts-ignore
//import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { GraphQLUpload } from "graphql-upload-minimal";

import { importResolver } from "../resolvers/importResolver";

const typeDefs = /* GraphQL */ `
  scalar Upload

  type Mutation {
    uploadCSV(file: Upload!): String!
  }

  type Query {
    _empty: String
  }
`;

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    ...importResolver,
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});



