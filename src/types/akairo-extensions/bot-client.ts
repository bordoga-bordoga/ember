import { ApolloQueryResult } from "@apollo/client";
import {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
  InhibitorHandler,
} from "discord-akairo";
import { Collection, Webhook, Snowflake } from "discord.js";
import path from "path";
import { Logger } from "winston";

import { CachePrefix } from "../../graphql/generated/CachePrefix";
import { graphQLClient, graphql } from "../../graphql/graphql-client";
import { graphqlServer } from "../../graphql/graphql-server";
import { EVENTS, logger, TOPICS } from "../../logger";

declare module "discord-akairo" {
  // eslint-disable-next-line functional/prefer-type-literal
  interface AkairoClient {
    readonly commandHandler: CommandHandler;
    readonly config: BotEnvironment;
    readonly logger: Logger;
    readonly webhooks: Collection<string, Webhook>;
  }
}

type BotEnvironment = {
  readonly commandCenter: Snowflake;
  readonly debugging: boolean;
  readonly owner: Snowflake;
  readonly token: Snowflake;
};

// class PrefixQuery extends ApolloQueryResult<CachePrefix> {}

export default class BotClient extends AkairoClient {
  public readonly inhibitorHandler: InhibitorHandler = new InhibitorHandler(
    this,
    {
      directory: path.join(__dirname, "../../", "inhibitors"),
    },
  );

  public readonly listenHandler: ListenerHandler = new ListenerHandler(this, {
    directory: path.join(__dirname, "../../", "listeners"),
  });

  public readonly commandHandler: CommandHandler = new CommandHandler(this, {
    directory: path.join(__dirname, "../../", "commands"),
    prefix: (message) =>
      !message.guild
        ? "?"
        : graphQLClient
            .query({
              query: graphql.constants.READ_PREFIX,
              variables: { id: message.guild.id },
            })
            .then(
              (data: ApolloQueryResult<CachePrefix>) =>
                data.data.guild?.prefix ?? "?",
            ),
    allowMention: true,
    commandUtil: true,
    handleEdits: true,
  })
    .useInhibitorHandler(this.inhibitorHandler)
    .useListenerHandler(this.listenHandler);

  public readonly config: BotEnvironment;

  public readonly logger = logger;

  public readonly graphqlServer = graphqlServer;

  public readonly graphQLClient = graphQLClient;

  public readonly graphql = graphql;

  public constructor(config: BotEnvironment) {
    super(
      {
        // Akairo Settings
        ownerID: config.owner,
      },
      {
        // discord.js Settings
        disableMentions: "everyone",
        messageCacheMaxSize: 2048,
        partials: ["MESSAGE", "CHANNEL", "REACTION"],
      },
    );
    this.config = config;
    this.listenHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenHandler,
      process,
    });
    this.listenHandler.loadAll();
    this.logger.verbose("Listener Handler Loaded", {
      topic: TOPICS.DISCORD_AKAIRO,
      event: EVENTS.INIT,
    });
    this.inhibitorHandler.loadAll();
    this.logger.verbose("Inhibitor Handler Loaded", {
      topic: TOPICS.DISCORD_AKAIRO,
      event: EVENTS.INIT,
    });
    this.commandHandler.loadAll();
    this.logger.verbose("Command Handler Loaded", {
      topic: TOPICS.DISCORD_AKAIRO,
      event: EVENTS.INIT,
    });

    process.on("unhandledRejection", (error: Error) =>
      this.logger.error(`${error.message}\n === \n ${error.stack ?? ""}`, {
        topic: TOPICS.UNHANDLED_REJECTION,
      }),
    );
  }

  public async start(): Promise<string> {
    return this.login(this.config.token);
  }
}
