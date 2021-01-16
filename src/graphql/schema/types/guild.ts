/* eslint-disable functional/no-expression-statement */
import { objectType } from "nexus";

const Guild = objectType({
  name: "Guild",
  definition(t) {
    t.model.id();
    t.model.prefix();
    t.model.welcomeEnabled();
    t.model.welcomeMessage();
    t.model.members();
  },
});

export default Guild;
