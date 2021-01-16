import { Command, Listener } from "discord-akairo";
import { Message } from "discord.js";
import { Logger } from "winston";

import { TOPICS, EVENTS } from "../../logger";

/**
 * Defines how to handle a command being blocked.
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Listener | akairo.Listener}
 */
export default class CommandBlockedListener extends Listener {
  public constructor() {
    super("commandBlocked", {
      emitter: "commandHandler",
      category: "commandHandler",
      event: "commandBlocked",
    });
  }

  /**
   * Main execution procedure for handling {@link https://discord-akairo.github.io/#/docs/main/master/class/CommandHandler?scrollTo=e-commandBlocked | a command being blocked} by an {@link https://discord-akairo.github.io/#/docs/main/master/class/Inhibitor | inhibitor}.
   *
   * @remarks
   * This is required by Akairo.
   *
   * @param message - Will contain the {@link https://discord.js.org/#/docs/main/stable/class/Message | Message} object that hooked the command.
   * @param command - Will be the {@link https://discord-akairo.github.io/#/docs/main/master/class/Command | Command} called.
   * @param reason - The reason provided by the {@link https://discord-akairo.github.io/#/docs/main/master/class/Inhibitor | inhibitor}.
   * @returns If client.config.commandCenter, a message sent to client.owner announcing the bot is active.
   */
  public exec(message: Message, command: Command, reason: string): Logger {
    return this.client.logger.verbose(
      `Blocked ${command.id} in ${
        message.guild ? `${message.guild.name} (${message.guild.id})` : "DM"
      } with reason ${reason}`,
      { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.COMMAND_BLOCKED },
    );
  }
}
