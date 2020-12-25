/* eslint-disable node/no-unpublished-require */
/* eslint-disable functional/no-expression-statement */
import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import path from "path";

import * as types from "./types";

const schema = makeSchema({
  shouldExitAfterGenerateArtifacts:
    process.env.NEXUS_SHOULD_EXIT_AFTER_GENERATE_ARTIFACTS === "true",
  types,
  contextType: {
    module: require.resolve("../context.ts"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: require.resolve(".prisma/client/index.d.ts"),
        alias: "PrismaClient",
      },
    ],
  },
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: path.join(__dirname, "schema.gen.graphql"),
    typegen: path.join(
      __dirname,
      "../../../../node_modules/@types/nexus-typegen/index.d.ts",
    ),
  },
});

export default schema;
