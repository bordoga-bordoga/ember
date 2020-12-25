import { Command, Listener } from "discord-akairo";
import { MessageReaction, Message } from "discord.js";
import { Logger } from "winston";

import { EVENTS, TOPICS } from "../../logging/logger";

/**
 * Defines how to set the presence of the bot as soon as we have a heartbeat from Discord
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Listener | akairo.Listener}
 */
export default class CommandErrorListener extends Listener {
  public constructor() {
    super("commandError", {
      emitter: "commandHandler",
      category: "commandHandler",
      event: "error",
    });
  }

  /**
   * Main execution procedure for handling {@link https://discord-akairo.github.io/#/docs/main/master/class/CommandHandler?scrollTo=e-error | a command finishing with an error}.
   *
   * @remarks
   * This is required by Akairo.
   *
   * @returns If client.config.commandCenter, a message sent to client.owner announcing the bot is active.
   */
  public async exec(
    error: Error,
    message: Message,
    command: Command,
  ): Promise<Message | MessageReaction | Logger | void> {
    // eslint-disable-next-line promise/no-promise-in-callback
    return message.channel
      .send(`Error occurred executing ${command.id}. ${error.message}`)
      .then(() => message.reactions.removeAll())
      .then((clearedMessage) => clearedMessage.react("⁉️"))
      .then(() =>
        this.client.logger.error(error.message, {
          topic: TOPICS.DISCORD_AKAIRO,
          event: EVENTS.COMMAND_ERROR,
        }),
      );
  }
}
