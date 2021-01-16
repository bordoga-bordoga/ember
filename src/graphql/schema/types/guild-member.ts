/* eslint-disable functional/no-expression-statement */
import { objectType } from "nexus";

const GuildMember = objectType({
  name: "GuildMember",
  definition(t) {
    t.model.id();
    t.model.guildID();
    t.model.member();
    t.model.roles();
  },
});

export default GuildMember;
