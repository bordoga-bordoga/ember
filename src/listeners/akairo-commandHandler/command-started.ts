import { Command, Listener } from "discord-akairo";
import { MessageReaction, Message } from "discord.js";
import { Logger } from "winston";

import { TOPICS, EVENTS } from "../../logger";

/**
 * Defines how to handle a command being started.
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Listener | akairo.Listener}
 */
export default class CommandStartedListener extends Listener {
  public constructor() {
    super("commandStarted", {
      emitter: "commandHandler",
      category: "commandHandler",
      event: "commandStarted",
    });
  }

  /**
   * Main execution procedure for handling {@link https://discord-akairo.github.io/#/docs/main/master/class/CommandHandler?scrollTo=e-commandStarted | a command starting}.
   *
   * @remarks
   * This is required by Akairo.
   *
   * @param message - Will contain the {@link https://discord.js.org/#/docs/main/stable/class/Message | Message} object that hooked the command.
   * @param command - Will be the {@link https://discord-akairo.github.io/#/docs/main/master/class/Command | Command} called.
   * @param commandArguments - The set of arguments discovered by akairo.
   * @returns If client.config.commandCenter, a message sent to client.owner announcing the bot is active.
   */
  public async exec(
    message: Message,
    command: Command,
    commandArguments: Record<string, unknown>,
  ): Promise<MessageReaction | Logger> {
    return message
      .react("⌛")
      .then(() =>
        this.client.logger.verbose(
          `Started ${command.id} on ${
            message.guild ? `${message.guild.name} (${message.guild.id})` : "DM"
          }${
            Object.keys(commandArguments).length > 0
              ? ` with arguments ${JSON.stringify(commandArguments)}`
              : ""
          }`,
          { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.COMMAND_STARTED },
        ),
      );
  }
}
