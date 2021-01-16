import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import fetch from "cross-fetch";
import gql from "graphql-tag";

import { logger, TOPICS, EVENTS } from "../logger";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  graphQLErrors?.forEach(({ message, locations, path }) =>
    logger.error(
      `Message: ${message}, Locations: ${
        locations?.toString() ?? "N/a"
      }, Path: ${path?.toString() ?? "N/a"}`,
      { topic: TOPICS.APOLLO_CLIENT, event: EVENTS.ERROR },
    ),
  );
  return !networkError
    ? undefined
    : ((logger.error(networkError.message, {
        topic: TOPICS.APOLLO_SERVER,
        event: EVENTS.ERROR,
      }) as unknown) as void);
});

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql", fetch });

export const graphQLClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default graphQLClient;

export const graphql = {
  constants: {
    CREATE_OR_UPDATE_PREFIX: gql`
      mutation UpsertPrefix($guildID: String!, $prefix: String!) {
        upsertOneGuild(
          where: { id: $guildID }
          create: { id: $guildID, prefix: $prefix }
          update: { prefix: { set: $prefix } }
        ) {
          prefix
        }
      }
    `,

    READ_PREFIX: gql`
      query CachePrefix($id: String!) {
        guild(where: { id: $id }) {
          prefix
        }
      }
    `,

    /* CREATE_OR_UPDATE_GUILDMEMBER_ROLES: gql`
      mutation UpsertGuildMember(
        $id: String!
        $guildID: String!
        $roleID: [String!]!
        $roleName: [String!]!
      ) {
        upsertOneGuildMember(
          where: { id_guildID: { id: $id, guildID: $guildID } }
          create: {}
          update: {}
        ) {
          roles {
            role {
              id
            }
          }
        }
      }
    `, */

    READ_GUILDMEMBER_ROLES: gql`
      query CacheMember($id: String!, $guildID: String!) {
        guildMember(where: { id_guildID: { id: $id, guildID: $guildID } }) {
          roles {
            role {
              id
            }
          }
        }
      }
    `,
  },
};
