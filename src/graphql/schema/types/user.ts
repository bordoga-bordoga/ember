/* eslint-disable functional/no-expression-statement */
import { objectType } from "nexus";

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
  },
});

export default User;
