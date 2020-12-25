import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class WelcomeCommand extends Command {
  public constructor() {
    super("welcome", {
      aliases: ["welcome"],
      category: "admin",
    });
  }

  /**
   * Main execution procedure for _ping
   *
   * @remarks
   * This is required by Akairo
   *
   * @param message - Will contain the Message object that hooked the command
   * @returns A message giving the latency between the bot client and Discord's servers
   */
  public async exec(message: Message): Promise<Message> {
    return (
      message.util?.send(Math.round(this.client.ws.ping).toString()) ??
      message.channel.send(Math.round(this.client.ws.ping).toString())
    );
  }
}
