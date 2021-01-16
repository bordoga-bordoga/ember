/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertGuildMember
// ====================================================

export interface UpsertGuildMember_upsertOneGuildMember_roles_role {
  __typename: "Role";
  id: string;
}

export interface UpsertGuildMember_upsertOneGuildMember_roles {
  __typename: "GuildMemberRole";
  role: UpsertGuildMember_upsertOneGuildMember_roles_role | null;
}

export interface UpsertGuildMember_upsertOneGuildMember {
  __typename: "GuildMember";
  roles: UpsertGuildMember_upsertOneGuildMember_roles[];
}

export interface UpsertGuildMember {
  upsertOneGuildMember: UpsertGuildMember_upsertOneGuildMember;
}

export interface UpsertGuildMemberVariables {
  id: string;
  guildID: string;
  roleID: string[];
  roleName: string[];
}
