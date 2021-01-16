import { Message } from "discord.js";

import BotCommand from "../../types/akairo-extensions/bot-command";

export default class PrefixCommand extends BotCommand {
  public constructor() {
    super("prefix", {
      aliases: ["prefix"],
      category: "admin",
      args: [{ id: "prefix", type: "string", match: "rest", default: "?" }],
    });
  }

  /**
   * Main execution procedure for _prefix
   *
   * @remarks
   * This is required by Akairo
   *
   * @param message - Will contain the Message object that hooked the command
   * @param prefix - Will contain a string for the desire prefix for the guild
   * @returns An updated guild prefix
   */
  public async exec(
    message: Message,
    { prefix }: { readonly prefix: string },
  ): Promise<string> {
    return !message.guild
      ? Promise.reject(new Error("This command must be run in a guild."))
      : this.client.graphQLClient
          .mutate({
            mutation: this.client.graphql.constants.CREATE_OR_UPDATE_PREFIX,
            variables: {
              guildID: message.guild.id,
              prefix,
            },
            refetchQueries: [
              {
                query: this.client.graphql.constants.READ_PREFIX,
                variables: { id: message.guild.id },
              },
            ],
          })
          .then(() =>
            Promise.resolve(
              `Updated the prefix for ${
                message.guild?.name ?? "the guild"
              } to ${prefix}`,
            ),
          );
  }
}
