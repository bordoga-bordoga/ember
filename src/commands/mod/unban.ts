import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class UnbanCommand extends Command {
  public constructor() {
    super("unban", {
      aliases: ["unban", "ub"],
      category: "mod",
      channel: "guild",
      clientPermissions: ["BAN_MEMBERS"],
      args: [{ id: "snowflake", type: "string" }],
    });
  }

  public async exec(
    message: Message,
    { snowflake }: { readonly snowflake: string },
  ): Promise<Message | void> {
    return message.guild?.members
      .unban(snowflake)
      .then((unbannedMember) =>
        message.util?.send(
          `${message.author.tag} has unbanned ${unbannedMember.tag}`,
        ),
      );
  }
}
