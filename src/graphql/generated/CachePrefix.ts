/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CachePrefix
// ====================================================

export interface CachePrefix_guild {
  __typename: "Guild";
  prefix: string | null;
}

export interface CachePrefix {
  guild: CachePrefix_guild | null;
}

export interface CachePrefixVariables {
  id: string;
}
