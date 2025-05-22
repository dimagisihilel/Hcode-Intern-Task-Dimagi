import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

// Main API service client (localhost:4000)
const mainClient = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000" }),
  cache: new InMemoryCache(),
});

// Batch-job service client (localhost:4002) - supports uploads
const uploadClient = new ApolloClient({
  link: createUploadLink({ uri: "http://localhost:4002/graphql" }) as any,
  cache: new InMemoryCache(),
});

export { mainClient, uploadClient };
