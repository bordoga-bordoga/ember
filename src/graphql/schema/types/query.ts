/* eslint-disable functional/no-expression-statement */
import { queryType } from "nexus";

const Query = queryType({
  definition(t) {
    t.crud.guild();
    t.crud.guilds();
    t.crud.guildMember();
    t.crud.guildMembers();
    t.crud.user();
    t.crud.users();
    t.crud.guildMemberRole();
    t.crud.guildMemberRoles();
  },
});

export default Query;
