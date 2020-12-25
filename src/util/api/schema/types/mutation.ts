/* eslint-disable functional/no-expression-statement */
import { mutationType } from "nexus";

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneGuild();
    t.crud.deleteOneGuild();
    t.crud.updateOneGuild();
    t.crud.upsertOneGuild();
    t.crud.createOneMember();
    t.crud.deleteOneMember();
    t.crud.updateOneMember();
    t.crud.upsertOneMember();
  },
});

export default Mutation;
