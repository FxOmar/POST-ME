import { ApolloServer, ExpressContext } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express, { Application } from "express";
import http from "http";

import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { context } from "./context";

import resolvers from "./api/resolvers/resolvers";
import { GraphQLSchema } from "graphql/type";

(async function () {
  /**
   * Load GraphQl schema
   */
  const typeDefs: GraphQLSchema = await loadSchema("./src/api/schema.graphql", {
    loaders: [new GraphQLFileLoader()],
  });

  const app: Application = express();

  const httpServer = http.createServer(app);

  const server: ApolloServer<ExpressContext> = new ApolloServer({
    typeDefs,
    resolvers,
    context: context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();
