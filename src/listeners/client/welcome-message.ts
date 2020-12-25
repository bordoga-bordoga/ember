import { Listener } from "discord-akairo";
import { Message, NewsChannel, TextChannel, GuildMember } from "discord.js";
/**
 * Defines how to announce a welcome message when users enter a guild.
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Listener | akairo.Listener}
 */
export default class WelcomeMessageListener extends Listener {
  /**
   * Emitted on {@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd | client.guildMemberAdd}
   */
  public constructor() {
    super("welcomeMessage", {
      emitter: "client",
      category: "client",
      event: "guildMemberAdd",
    });
  }

  /**
   * Main execution procedure for the banner that can optionally be shown when a guild member is added.
   *
   * @remarks
   * This is required by Akairo
   *
   * @param newMember - Will contain the new {@link https://discord.js.org/#/docs/main/stable/class/GuildMember| guildMember}.
   * @returns If Settings.welcomeEnabled, a message sent to Settings.welcomeChannel set by admins through {@link WelcomeCommand}
   */
  public async exec(newMember: GuildMember): Promise<Message> {
    return ((newMember.guild.channels.resolve("") ?? // TODO make this load the welcome channel from settings
      newMember.guild.systemChannel) as TextChannel)?.send(
      // TODO make this conditionally load the welcome message from settings
      `Hey <@${newMember.id}>. Welcome to the **${
        newMember.guild.name
      }** Discord.${
        newMember.guild.rulesChannel
          ? ` Read through the <#${
              newMember.guild.rulesChannelID ?? ""
            }> channel before engaging.`
          : ""
      }${
        newMember.guild.channels.cache.some(
          (channel) => channel instanceof NewsChannel,
        )
          ? ` Check out <#${
              newMember.guild.channels.cache.findKey(
                (channel) => channel instanceof NewsChannel,
              ) ?? ""
            }> for community updates.`
          : ""
      } Enjoy the server!`,
      {
        files: [
          newMember.guild.bannerURL() ??
            newMember.guild.discoverySplashURL() ??
            newMember.guild.iconURL() ??
            "src/assets/img/welcome.png",
        ],
      },
    );
  }
}
