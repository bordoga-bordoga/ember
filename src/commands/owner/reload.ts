import { Command } from "discord-akairo";
import { Message } from "discord.js";

/**
 * Defines how to respond to _reload.
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Command | akairo.Command}
 */
export default class ReloadCommand extends Command {
  public constructor() {
    super("reload", {
      aliases: ["reload"],
      ownerOnly: true,
      category: "owner",
    });
  }

  /**
   * Main execution procedure for _reload.
   *
   * @remarks
   * This is required by Akairo
   *
   * @param message - Will contain the {@link https://discord.js.org/#/docs/main/stable/class/Message | Message} object that hooked the command.
   * @returns A message indicating that all handlers have been reloaded.
   */
  public async exec(message: Message): Promise<string> {
    /*
    this.client.commandHandler.reloadAll();
    this.client.listenHandler.reloadAll();
    this.client.inhibitorHandler.reloadAll(); */
    return Promise.resolve(`Reloaded, ${message.author.tag}.`);
  }
}
