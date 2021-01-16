import { Inhibitor, Command } from "discord-akairo";
import { Snowflake, Message } from "discord.js";

/**
 * Defines how to block commands in the mod category from being run by users without the server's set moderator roles.
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Inhibitor | akairo.Inhibitor}
 */
export default class ModeratorOnlyInhibitor extends Inhibitor {
  private readonly modRoles: readonly Snowflake[] = [
    "785739250497749022",
    "785739276418940961",
  ]; // TODO read from server settings

  public constructor() {
    super("modOnly", {
      reason:
        "Command is in the 'mod' category, but was run by a non-moderator. Please expand moderator roles or give the user a moderator role.",
    });
  }

  /**
   * Main execution procedure for evaluating if a given {@link https://discord.js.org/#/docs/main/stable/class/Message | message} is qualified for commands in the mod category.
   *
   * @remarks
   * This is required by Akairo.
   *
   * @param message - the message under evaluation
   * @param command - the {@link https://discord-akairo.github.io/#/docs/main/master/class/Command | command} that the {@link https://discord-akairo.github.io/#/docs/main/master/class/CommandHandler | command handler} has parsed from the message.
   * @returns Whether the author of the message has a role specified in Settings.modRoles
   */
  public exec(message: Message, command: Command): boolean {
    return (
      command.categoryID === "mod" &&
      !message.member?.roles.cache.some((role) =>
        this.modRoles.includes(role.id),
      ) &&
      !message.member?.permissions.has("ADMINISTRATOR")
    );
  }
}
