/* eslint-disable functional/no-expression-statement */
import { queryType } from "nexus";

const Query = queryType({
  definition(t) {
    t.crud.guild();
    t.crud.guilds();
    t.crud.member();
    t.crud.members();
    t.crud.user();
    t.crud.users();
  },
});

export default Query;
