/* eslint-disable functional/no-expression-statement */
import { objectType } from "nexus";

const Member = objectType({
  name: "Member",
  definition(t) {
    t.model.id();
    t.model.guildId();
    t.model.member();
    t.model.Guild();
  },
});

export default Member;
