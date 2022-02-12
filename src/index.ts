import "dotenv/config";

import { ApolloServer, ExpressContext } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

import express, { Application } from "express";
import { createServer } from "http";

import { PrismaClient } from "@prisma/client";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLSchema } from "graphql/type";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

import resolvers from "./api/resolvers";

/**
 * Load GraphQl schema
 */
const typeDefs: GraphQLSchema = loadSchemaSync(
  "./src/api/schema/schema.graphql",
  {
    loaders: [new GraphQLFileLoader()],
  }
);

const prisma = new PrismaClient();

(async function () {
  const app: Application = express();

  const httpServer = createServer(app);

  const server: ApolloServer<ExpressContext> = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res, prisma }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // app.use(validateTokensMiddleware); // middleware to be built

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();
