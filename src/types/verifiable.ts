import { Client, Message, GuildMember } from "discord.js";

export default class Verifiable extends GuildMember {
  private static readonly admin: string = "785739276418940961";

  private static readonly verificationVoice: string = "785742330967490570";

  private readonly original: GuildMember;

  public constructor(client: Client, member: GuildMember) {
    super(client, member, member.guild);
    this.original = member;
  }

  /**
   * Checks that the user has push to talk enabled.
   *
   * @param message - Will contain the {@link https://discord.js.org/#/docs/main/stable/class/Message | Message} object that hooked the command.
   * @param member - The {@link https://discord.js.org/#/docs/main/stable/class/GuildMember | member} mentioned in the command call to be verified.
   * @returns A {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise | Promisified} {@link https://discord.js.org/#/docs/main/stable/class/GuildMember | member} that is verifiable, or an {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error | Error}.
   */
  public static readonly isUnmuted = async function checkForPushToTalk(
    message: Message,
    member: GuildMember,
  ): Promise<GuildMember> {
    return !message.member?.roles.cache.has(Verifiable.admin) &&
      member.voice.selfMute !== false
      ? Promise.reject(
          new Error(
            `${message.author.tag} attempted to verify ${member.user.tag} while they did not have push to talk enabled.`,
          ),
        )
      : Promise.resolve(member);
  };

  /**
   * Checks that the user is in the proper voice chat for verification.
   *
   * @param message - Will contain the {@link https://discord.js.org/#/docs/main/stable/class/Message | Message} object that hooked the command.
   * @param member - The {@link https://discord.js.org/#/docs/main/stable/class/GuildMember | member} mentioned in the command call to be verified.
   * @returns A {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise | Promisified} {@link https://discord.js.org/#/docs/main/stable/class/GuildMember | member} that is verifiable, or an {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error | Error}.
   */
  public static readonly isInVC = async function checkForVerificationVoiceChat(
    message: Message,
    member: GuildMember,
  ): Promise<GuildMember> {
    return !message.member?.roles.cache.has(Verifiable.admin) &&
      member.voice.channelID !== Verifiable.verificationVoice
      ? Promise.reject(
          new Error(
            `${message.author.tag} attempted to verify ${member.user.tag} who was not in the verification VC.`,
          ),
        )
      : Promise.resolve(member);
  };

  public static readonly isVerifiable = async (
    message: Message,
    member: GuildMember,
  ): Promise<GuildMember> => {
    return Verifiable.isInVC(message, member).then(async () =>
      Verifiable.isUnmuted(message, member),
    );
  };

  public readonly isInVC = async (message: Message): Promise<GuildMember> => {
    return Verifiable.isInVC(message, this.original);
  };

  public readonly isUnmuted = async (
    message: Message,
  ): Promise<GuildMember> => {
    return Verifiable.isUnmuted(message, this.original);
  };

  public readonly isVerifiable = async (
    message: Message,
  ): Promise<GuildMember> => {
    return Verifiable.isVerifiable(message, this.original);
  };
}
