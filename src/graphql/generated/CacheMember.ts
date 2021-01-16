/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CacheMember
// ====================================================

export interface CacheMember_guildMember_roles_role {
  __typename: "Role";
  id: string;
}

export interface CacheMember_guildMember_roles {
  __typename: "GuildMemberRole";
  role: CacheMember_guildMember_roles_role | null;
}

export interface CacheMember_guildMember {
  __typename: "GuildMember";
  roles: CacheMember_guildMember_roles[];
}

export interface CacheMember {
  guildMember: CacheMember_guildMember | null;
}

export interface CacheMemberVariables {
  id: string;
  guildID: string;
}
