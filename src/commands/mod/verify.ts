import { Message, GuildMember } from "discord.js";

import BotCommand from "../../types/akairo-extensions/bot-command";
import Verifiable from "../../types/verifiable";

/**
 * Defines how to respond to _vegan and _nonvegan.
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Command | akairo.Command}
 */
export default class VerifyCommand extends BotCommand {
  private static readonly vegan: string = "785732887206952962"; // TODO - read this stuff from Settings

  private static readonly nonvegan: string = "785732911549775883";

  private static readonly verified: string = "785739074900197417";

  private static readonly generalVoice: string = "784283010991128596";

  public constructor() {
    super("verify", {
      aliases: ["vegan", "nonvegan", "v", "nv"],
      category: "mod",
      channel: "guild",
      clientPermissions: ["MANAGE_ROLES", "MOVE_MEMBERS"],
      args: [{ id: "member", type: "member" }],
    });
  }

  /**
   * Gives the user the verification {@link https://discord.js.org/#/docs/main/stable/class/Role | Role} and moves them to a new {@link https://discord.js.org/#/docs/main/stable/class/VoiceChannel | VoiceChannel}
   *
   * @param message - Will contain the {@link https://discord.js.org/#/docs/main/stable/class/Message | Message} object that hooked the command.
   * @param member - The {@link https://discord.js.org/#/docs/main/stable/class/GuildMember | member} mentioned in the command call to be verified.
   * @returns A {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise | Promisified} {@link https://discord.js.org/#/docs/main/stable/class/GuildMember | member} that is verified.
   */
  private static readonly verify = async function verifyGuildMember(
    member: GuildMember,
  ): Promise<GuildMember> {
    return member.roles.cache.has(VerifyCommand.verified)
      ? member
      : member.roles
          .add(VerifyCommand.verified)
          .then((verifiedMember) =>
            verifiedMember.voice.channelID
              ? verifiedMember.voice.setChannel(VerifyCommand.generalVoice)
              : verifiedMember,
          );
  };

  /**
   * Flushes relevant roles and replaces them with desired value.
   *
   * @param member - The {@link https://discord.js.org/#/docs/main/stable/class/GuildMember | member} mentioned in the command call to have their {@link https://discord.js.org/#/docs/main/stable/class/GuildMemberRoleManager | roles set}.
   * @param isVegan - which {@link https://discord.js.org/#/docs/main/stable/class/Role | Role} the {@link https://discord.js.org/#/docs/main/stable/class/GuildMember | member} should receive.
   * @returns A {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise | Promisified} {@link https://discord.js.org/#/docs/main/stable/class/GuildMember | member} with the proper roles.
   */
  private static readonly setStatus = async function setGuildMemberRoles(
    member: GuildMember,
    isVegan: boolean,
  ): Promise<GuildMember> {
    return member.roles
      .remove([VerifyCommand.vegan, VerifyCommand.nonvegan])
      .then(async (flushedMember) =>
        flushedMember.roles.add(
          isVegan ? VerifyCommand.vegan : VerifyCommand.nonvegan,
        ),
      );
  };

  /**
   * Main execution procedure for _vegan and _nonvegan.
   *
   * @remarks
   * This is required by Akairo
   *
   * @param message - Will contain the {@link https://discord.js.org/#/docs/main/stable/class/Message | Message} object that hooked the command.
   * @param member - The {@link https://discord.js.org/#/docs/main/stable/class/GuildMember | member} mentioned in the command call to have their {@link https://discord.js.org/#/docs/main/stable/class/GuildMemberRoleManager | roles set}.
   * @returns A message indicating that all handlers have been reloaded.
   */
  public async exec(
    message: Message,
    { member }: { readonly member: GuildMember },
  ): Promise<string> {
    const isVegan: boolean =
      message.util?.parsed?.alias?.charAt(0).toLowerCase() === "v";

    return member.roles.cache.has(
      isVegan ? VerifyCommand.vegan : VerifyCommand.nonvegan,
    )
      ? Promise.resolve("")
      : new Verifiable(this.client, member)
          .isVerifiable(message)
          .then((unmutedMember) => VerifyCommand.verify(unmutedMember))
          .then((verifiedMember) =>
            VerifyCommand.setStatus(verifiedMember ?? member, isVegan),
          )
          .then((fullyVerifiedMember) =>
            Promise.resolve(
              `<@${fullyVerifiedMember.id}> has been verified as a ${
                isVegan ? "vegan" : "nonvegan"
              } by <@${message.author.id}>`,
            ),
          );
  }
}
