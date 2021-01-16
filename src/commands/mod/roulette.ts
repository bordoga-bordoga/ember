import { Message, GuildMember } from "discord.js";

import BotCommand from "../../types/akairo-extensions/bot-command";

/**
 * Defines how to respond to _roulette.
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Command | akairo.Command}
 */
export default class RussianRouletteCommand extends BotCommand {
  public constructor() {
    super("roulette", {
      aliases: ["roulette", "r"],
      category: "mod",
      channel: "guild",
      clientPermissions: ["KICK_MEMBERS", "BAN_MEMBERS"],
      args: [{ id: "member", type: "member" }],
    });
  }

  /**
   * Main execution procedure for _roulette.
   *
   * @remarks
   * This is required by Akairo
   *
   * @param message - Will contain the {@link https://discord.js.org/#/docs/main/stable/class/Message | Message} object that hooked the command.
   * @param member - The {@link https://discord.js.org/#/docs/main/stable/class/GuildMember | member} mentioned in the command call to be either kicked or banned.
   * @returns A message indicating that all handlers have been reloaded.
   */
  public async exec(
    message: Message,
    { member }: { readonly member: GuildMember },
  ): Promise<string> {
    const value = Math.random();
    const chance = value < 0.5;
    return (chance ? member.kick() : member.ban()).then((managedMember) =>
      Promise.resolve(
        `<@${message.author.id}> has ${chance ? "kicked" : "banned"} **${
          managedMember.user.tag
        }** after rolling a ${value}`,
      ),
    );
  }
}
