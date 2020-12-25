import { Inhibitor } from "discord-akairo";
import { Message } from "discord.js";

/**
 * Defines how to block commands from users on the global or server blacklists.
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Inhibitor | akairo.Inhibitor}
 */
export default class BlacklistInhibitor extends Inhibitor {
  private readonly blacklist: readonly string[] = [];

  public constructor() {
    super("blacklist", {
      reason: "blacklist",
    });
  }

  /**
   * Main execution procedure for evaluating if a given {@link https://discord.js.org/#/docs/main/stable/class/Message | message} is from a blacklisted user.
   *
   * @remarks
   * This is required by Akairo.
   *
   * @param message - the message under evaluation
   * @param command - the {@link https://discord-akairo.github.io/#/docs/main/master/class/Command | command} that the {@link https://discord-akairo.github.io/#/docs/main/master/class/CommandHandler | command handler} has parsed from the message.
   * @returns Whether the author of the message is on the global blacklist or is on the server blacklist.
   */
  public exec(message: Message): boolean {
    return this.blacklist.includes(message.author.id);
  }
}
