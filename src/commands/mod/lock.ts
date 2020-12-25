import { Command } from "discord-akairo";
import { VoiceChannel, Message } from "discord.js";

import VoiceUtils from "../../util/functions/voice";

/**
 * Defines how to respond to _lock.
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Command | akairo.Command}
 */
export default class LockCommand extends Command {
  public constructor() {
    super("lock", {
      aliases: ["lock", "l"],
      category: "mod",
      channel: "guild",
      clientPermissions: ["MANAGE_CHANNELS"],
      args: [{ id: "target", type: "string", match: "rest" }],
    });
  }

  /**
   * Main execution procedure for _vegan and _nonvegan.
   *
   * @remarks
   * This is required by Akairo
   *
   * TODO - Extend this with a {@link https://discord.js.org/#/docs/main/stable/class/Role | Role} or {@link https://discord.js.org/#/docs/main/stable/class/GuildMember | member} argument which will override the default of the verification role.
   *
   * @param message - Will contain the {@link https://discord.js.org/#/docs/main/stable/class/Message | Message} object that hooked the command.
   * @param target - Either a {@link https://discord.js.org/#/docs/main/stable/typedef/Snowflake | Snowflake} or a string to search for.
   *
   * @returns A locked {@link https://discord.js.org/#/docs/main/stable/class/VoiceChannel | Voice Channel} if it exists in the {@link https://discord.js.org/#/docs/main/stable/class/Guild | Guild}, an {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error | Error} if the {@link https://discord.js.org/#/docs/main/stable/typedef/Snowflake | Snowflake} is not a {@link https://discord.js.org/#/docs/main/stable/class/VoiceChannel | Voice Channel}, otherwise {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined | undefined}.
   */
  public async exec(
    message: Message,
    { target }: { readonly target: string },
  ): Promise<string> {
    return !message.guild
      ? Promise.reject(new Error("Guild Does Not Exist"))
      : VoiceUtils.resolveVC(message.guild, target)
          .then((targetChannel) =>
            !targetChannel?.permissionsFor("785739074900197417")?.has("CONNECT")
              ? undefined
              : targetChannel?.overwritePermissions([
                  { id: "785739074900197417", deny: ["CONNECT"] },
                ]),
          )
          .then((permissionedChannel: VoiceChannel | undefined) => {
            return {
              members: Promise.all(
                permissionedChannel?.members.map((member) =>
                  member.voice.setChannel("784283010991128596"),
                ) ?? [],
              ),
              lockedChannel: permissionedChannel,
            };
          })
          .then(async (lockedState) => {
            const members = await lockedState.members;
            return new Promise((resolve) =>
              resolve(
                !lockedState.lockedChannel
                  ? ""
                  : `<@${message.author.id}> has locked **${
                      lockedState.lockedChannel?.name ?? ""
                    }** and moved ${members.length} user${
                      members.length > 1 ? "s" : ""
                    }.`,
              ),
            );
          });
  }
}