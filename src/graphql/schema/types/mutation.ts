/* eslint-disable functional/no-expression-statement */
import { mutationType } from "nexus";

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneGuild();
    t.crud.deleteOneGuild();
    t.crud.updateOneGuild();
    t.crud.upsertOneGuild();
    t.crud.updateManyGuild();
    t.crud.deleteManyGuild();
    t.crud.createOneGuildMember();
    t.crud.deleteOneGuildMember();
    t.crud.updateOneGuildMember();
    t.crud.upsertOneGuildMember();
    t.crud.updateManyGuildMember();
    t.crud.deleteManyGuildMember();
    t.crud.createOneGuildMemberRole();
    t.crud.deleteOneGuildMemberRole();
    t.crud.updateOneGuildMemberRole();
    t.crud.upsertOneGuildMemberRole();
    t.crud.updateManyGuildMemberRole();
    t.crud.deleteManyGuildMemberRole();
    t.crud.createOneRole();
    t.crud.deleteOneRole();
    t.crud.updateOneRole();
    t.crud.upsertOneRole();
    t.crud.updateManyRole();
    t.crud.deleteManyRole();
  },
});

export default Mutation;
