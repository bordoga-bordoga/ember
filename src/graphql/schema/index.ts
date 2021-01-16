import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import path from "path";

import { EVENTS, logger, TOPICS } from "../../logger";
import * as types from "./types";

const generateSchema: boolean =
  Boolean(process.env.TS_NODE_DEV) || process.env.NODE_ENV === "development";

logger.prompt(
  generateSchema
    ? "Detected we are in a TypeScript development environment.. Creating new TypeSafe Schema..."
    : "Creating Schema",
  {
    topic: TOPICS.NEXUS,
    event: EVENTS.INIT,
  },
);

export const schema = makeSchema({
  shouldExitAfterGenerateArtifacts:
    process.env.NEXUS_SHOULD_EXIT_AFTER_GENERATE_ARTIFACTS === "true",
  shouldGenerateArtifacts: generateSchema,
  types,
  contextType: {
    module: path.join(__dirname, "../context.ts"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: require.resolve(".prisma/client/index.d.ts"),
        alias: "PrismaClient",
      },
    ],
    mapping: {
      Date: "Date",
      DateTime: "Date",
      Json: "JSON",
    },
  },
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: path.join(__dirname, "../generated/schema.gen.graphql"),
    typegen: path.join(__dirname, "../generated/nexus-typegen.d.ts"),
  },
});

logger.prompt("Schema Created...", {
  topic: TOPICS.NEXUS,
  event: EVENTS.READY,
});

export default schema;
