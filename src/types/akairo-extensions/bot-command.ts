import { Command } from "discord-akairo";
import { Message } from "discord.js";

import BotClient from "./bot-client";

export default abstract class BotCommand extends Command {
  public readonly client!: BotClient;

  /**
   * Although the message utility is turned on in Ember's {@link BotClient}, TypeScript has no way of knowing so. This function avoids the compiler complaining, as well as provides for the edge case where the message utility is turned off. It will first attemt to use the utility send function, then fallback ont he default DiscordJS method.
   * @param message - The messsage that hooked the command.
   * @param content - The content of the message to be sent.
   * @returns - A Promisified message with the content desired.
   */
  public readonly send = async function sendMessageInCommandChannel(
    message: Message,
    content: string,
  ): Promise<Message> {
    return message.util?.send(content) ?? message.channel.send(content);
  };

  public abstract exec(message: Message, arguments_: unknown): Promise<string>;
}
