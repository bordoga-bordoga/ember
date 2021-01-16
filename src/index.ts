// index.ts
/**
 * AYBot
 * ======
 * `AYBot` is a community driven TypeScript rewrite of various tools in use [at the Ask Yourself discord](https://discord.gg/dUPFfby), along with extra functionality.
 *
 * Contributing to the bot should serve as a learning experience, or way to give back to the AY community.
 *
 * The bot will be sometimes tailored to the purposes needed in the AY server, but in general development will be geared to creating a general-purpose bot that could be used and extended by anyone.
 *
 * @see Bryn's discord server if you wish to contribute or need help running the bot yourself.
 *
 * @packageDocumentation
 * @alpha
 */
import "dotenv/config";

import BotClient from "./types/akairo-extensions/bot-client";
import { TOPICS, EVENTS } from "./logger";

/**
 * owner, token, and commandCenter are defined in a .env file
 *
 * owner is {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array | Array}\<{@link https://discord.js.org/#/docs/main/stable/typedef/Snowflake | Snowflake}\> | {@link https://discord.js.org/#/docs/main/stable/typedef/Snowflake | Snowflake} for user accounts which should have access to {@link https://discord-akairo.github.io/#/docs/main/master/typedef/CommandOptions | ownerOnly} commands such as {@link ReloadCommand}
 *
 * token can be accessed from {@link https://discord.com/developers/applications | The Discord Developer Portal}
 *
 * commandCenter is {@link https://discord.js.org/#/docs/main/stable/typedef/Snowflake | Snowflake} for a guild which can optionally be sent owner-only logs and optionally be exclusively whitelisted for {@link https://discord-akairo.github.io/#/docs/main/master/class/Command | commands} with {@link https://discord-akairo.github.io/#/docs/main/master/typedef/CommandOptions | ownerOnly}
 *
 * @see {@link BotClient} for a full declaration of startup, rather than this entry point.
 * @see .env.example for the configuration of the bot.
 */
const botClient: BotClient = new BotClient({
  commandCenter: process.env.commandCenter ?? "",
  debugging:
    (process.env.debugging === "true" ||
      process.env.NODE_ENV === "development") ??
    false,
  owner: process.env.owner ?? "",
  token: process.env.token ?? "",
});

botClient.start().catch((error: Error) =>
  botClient.logger.error(error.message, {
    topic: TOPICS.DISCORD,
    event: EVENTS.ERROR,
  }),
);

export default botClient;
