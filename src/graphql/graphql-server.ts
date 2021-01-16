/* eslint-disable functional/no-expression-statement */
import { ApolloServer } from "apollo-server";

import { logger, TOPICS, EVENTS } from "../logger";
import { createContext } from "./context";
import { schema } from "./schema";

export const graphqlServer = new ApolloServer({
  schema,
  context: createContext,
  tracing: process.env.NODE_ENV === "development",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

graphqlServer
  .listen()
  .then((serverInfo) =>
    logger.prompt(`🚀 Server ready at  ${serverInfo.url}`, {
      topic: TOPICS.APOLLO_SERVER,
      event: EVENTS.READY,
    }),
  )
  .catch((error: Error) =>
    logger.error(error.message, {
      topic: TOPICS.APOLLO_SERVER,
      event: EVENTS.ERROR,
    }),
  );

export default graphqlServer;
