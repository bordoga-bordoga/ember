import { FetchResult } from "@apollo/client";
import { GuildMember } from "discord.js";

import { CacheMember } from "../../graphql/generated/CacheMember";
import BotListener from "../../types/akairo-extensions/bot-listener";
/**
 * Defines how to store properties for stickiness when a {@link https://discord.js.org/#/docs/main/stable/class/GuildMember| guildMember} is updated.
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Listener | akairo.Listener}
 */
export default class StickyPropertyListener extends BotListener {
  /**
   * Emitted on {@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberUpdate | client.guildMemberUpdate}
   */
  public constructor() {
    super("stickyProperties", {
      emitter: "client",
      category: "client",
      event: "guildMemberUpdate",
    });
  }

  /**
   * Main execution procedure for handling the update by saving the {@link https://discord.js.org/#/docs/main/stable/class/GuildMember| guildMember} via upsert.
   *
   * @remarks
   * This is required by Akairo
   *
   * @param oldMember - Will contain the old {@link https://discord.js.org/#/docs/main/stable/class/GuildMember| guildMember}.
   * @param newMember - Will contain the new {@link https://discord.js.org/#/docs/main/stable/class/GuildMember| guildMember}, containing role and nickname changes.
   * @returns An upsert of the guildMember's object to the database.
   */
  public async exec(
    oldMember: GuildMember,
    newMember: GuildMember,
  ): Promise<void | FetchResult<
    CacheMember,
    Record<string, CacheMember>,
    Record<string, CacheMember>
  >> {
    this.client.logger.verbose(newMember);
    return !(
      oldMember.roles === newMember.roles ||
      oldMember.nickname !== newMember.nickname
    )
      ? Promise.resolve()
      : Promise.resolve(); /* this.client.graphQLClient.mutate({
          mutation: this.client.graphql.constants.CREATE_OR_UPDATE_GUILDMEMBER,
          variables: {
            id: newMember.id,
            guildID: newMember.guild.id,
            member: newMember,
            user: newMember.user,
          },
          refetchQueries: [
            {
              query: this.client.graphql.constants.READ_GUILDMEMBER,
              variables: {
                id: newMember.id,
                guildID: newMember.guild.id,
              },
            },
          ],
        }); */
  }
}
