/* eslint-disable functional/no-expression-statement */
import { objectType } from "nexus";

const GuildMemberRole = objectType({
  name: "GuildMemberRole",
  definition(t) {
    t.model.guildID();
    t.model.guildMember();
    t.model.guildMemberID();
    t.model.role();
    t.model.roleID();
    t.model.updatedAt();
    t.model.createdAt();
  },
});

export default GuildMemberRole;
