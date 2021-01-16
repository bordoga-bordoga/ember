/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertPrefix
// ====================================================

export interface UpsertPrefix_upsertOneGuild {
  __typename: "Guild";
  prefix: string | null;
}

export interface UpsertPrefix {
  upsertOneGuild: UpsertPrefix_upsertOneGuild;
}

export interface UpsertPrefixVariables {
  guildID: string;
  prefix: string;
}
