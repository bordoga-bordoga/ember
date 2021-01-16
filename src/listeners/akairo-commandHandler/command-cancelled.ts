import { Command, Listener } from "discord-akairo";
import { Message } from "discord.js";
import { Logger } from "winston";

import { TOPICS, EVENTS } from "../../logger";

/**
 * Defines how to handle a command being cancelled.
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Listener | akairo.Listener}
 */
export default class CommandCancelledListener extends Listener {
  public constructor() {
    super("commandCancelled", {
      emitter: "commandHandler",
      category: "commandHandler",
      event: "commandCancelled",
    });
  }

  /**
   * Main execution procedure for handling {@link https://discord-akairo.github.io/#/docs/main/master/class/CommandHandler?scrollTo=e-commandBlocked | a command being cancelled}.
   *
   * @remarks
   * This is required by Akairo.
   *
   * @param message - Will contain the {@link https://discord.js.org/#/docs/main/stable/class/Message | Message} object that hooked the command.
   * @param command - Will be the {@link https://discord-akairo.github.io/#/docs/main/master/class/Command | Command} called.
   * @returns If client.config.commandCenter, a message sent to client.owner announcing the bot is active.
   */
  public exec(message: Message, command: Command): Logger {
    return this.client.logger.verbose(
      `Cancelled ${command.id} on ${
        message.guild ? `${message.guild.name} (${message.guild.id})` : "DM"
      }`,
      { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.COMMAND_CANCELLED },
    );
  }
}
