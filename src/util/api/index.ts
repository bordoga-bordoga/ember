/* eslint-disable functional/no-expression-statement */
import { logger } from "../../logging/logger";
import { server } from "./server";

server
  .listen()
  .then((serverInfo) => logger.info(`🚀 Server ready at  ${serverInfo.url}`))
  .catch((error: Error) => logger.error(error.message));
