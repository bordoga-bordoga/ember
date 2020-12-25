import { Command } from "discord-akairo";
import { Message } from "discord.js";

/**
 * Defines how to respond to _ping.
 *
 * @remarks
 * Example for defining a command using promise chaining.
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Command | Akairo Command}
 */
export default class PingCommand extends Command {
  public constructor() {
    super("ping", {
      aliases: ["ping"],
      category: "example",
    });
  }

  /**
   * Main execution procedure for _ping
   *
   * @remarks
   * This is required by Akairo
   *
   * @param message - Will contain the {@link https://discord.js.org/#/docs/main/stable/class/Message | Message} object that hooked the command
   * @returns A message giving the latency between the bot client and Discord's servers
   */
  public async exec(message: Message): Promise<Message> {
    return (
      message.util?.send(Math.round(this.client.ws.ping).toString()) ??
      message.channel.send(Math.round(this.client.ws.ping).toString())
    );
  }
}
