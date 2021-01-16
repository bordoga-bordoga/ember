/* eslint-disable functional/no-expression-statement */
import { objectType } from "nexus";

const Role = objectType({
  name: "Role",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.members();
    t.model.guild();
  },
});

export default Role;
