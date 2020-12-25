import { Command, Listener } from "discord-akairo";
import { MessageReaction, Message } from "discord.js";
import { Logger } from "winston";

import { TOPICS, EVENTS } from "../../logging/logger";

/**
 * Defines how to handle a command being finished.
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Listener | akairo.Listener}
 */
export default class CommandFinishedListener extends Listener {
  public constructor() {
    super("commandFinished", {
      emitter: "commandHandler",
      category: "commandHandler",
      event: "commandFinished",
    });
  }

  /**
   * Main execution procedure for handling {@link https://discord-akairo.github.io/#/docs/main/master/class/CommandHandler?scrollTo=e-commandFinished | a command finishing}.
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
    returnValue: Promise<string>,
  ): Promise<MessageReaction | Logger | readonly Message[] | Message> {
    return message.reactions
      .removeAll()
      .then((clearedMessage) => clearedMessage.react("✅"))
      .then(() =>
        this.client.logger.info(
          `Finished ${command.id} on ${
            message.guild ? `${message.guild.name} (${message.guild.id})` : "DM"
          }${
            Object.keys(commandArguments).length > 0
              ? ` with arguments ${JSON.stringify(commandArguments)}`
              : ""
          }`,
          { topic: TOPICS.DISCORD_AKAIRO, event: EVENTS.COMMAND_FINISHED },
        ),
      )
      .then(() => returnValue)
      .then((content) => message.channel.send(content));
  }
}
