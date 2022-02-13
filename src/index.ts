import "dotenv/config";

import { ApolloServer, ExpressContext } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  AuthenticationError,
} from "apollo-server-core";

import express, { Application } from "express";
import { createServer } from "http";

import { PrismaClient } from "@prisma/client";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLSchema } from "graphql/type";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { makeExecutableSchema } from "@graphql-tools/schema";

import resolvers from "./api/resolvers";
import { validateToken } from "./utils/JWT";

import { isAuthenticatedDirectiveTransformer } from "./directives";

const prisma = new PrismaClient();

/**
 * Load GraphQl schema
 */
const typeDefs: GraphQLSchema = loadSchemaSync(
  "./src/api/schema/schema.graphql",
  {
    loaders: [new GraphQLFileLoader()],
  }
);

let schema = makeExecutableSchema({ typeDefs, resolvers });

schema = isAuthenticatedDirectiveTransformer(schema, "isAuthenticated");

const getUser = async (token) => {
  try {
    const decodedToken = await validateToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.user.id,
      },
    });

    return user;
  } catch (err) {
    return null;
  }
};

(async function () {
  const app: Application = express();

  const httpServer = createServer(app);

  const server: ApolloServer<ExpressContext> = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      // Get the user token from the headers.
      const token = req.headers.authorization || "";

      // Try to retrieve a user with the token
      const user = await getUser(token);

      return { req, res, prisma, user };
    },
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
