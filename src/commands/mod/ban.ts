import { Message, GuildMember } from "discord.js";

import BotCommand from "../../types/akairo-extensions/bot-command";

/**
 * Defines how to respond to _ban.
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Command | akairo.Command}
 */
export default class BanCommand extends BotCommand {
  public constructor() {
    super("ban", {
      aliases: ["ban", "b"],
      category: "mod",
      channel: "guild",
      clientPermissions: ["BAN_MEMBERS"],
      args: [{ id: "member", type: "member" }],
    });
  }

  /**
   * Main execution procedure for _ban.
   *
   * @remarks
   * This is required by Akairo
   *
   * @param message - Will contain the {@link https://discord.js.org/#/docs/main/stable/class/Message | Message} object that hooked the command.
   * @param member - The {@link https://discord.js.org/#/docs/main/stable/class/GuildMember | member} mentioned in the command call to be banned.
   * @returns A message indicating that all handlers have been reloaded.
   */
  public async exec(
    message: Message,
    { member }: { readonly member: GuildMember },
  ): Promise<string> {
    return member
      .ban()
      .then((bannedMember) =>
        Promise.resolve(
          `<@${message.author.id}> has banned **${bannedMember.user.tag}**`,
        ),
      );
  }
}
