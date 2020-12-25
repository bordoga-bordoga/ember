import { stripIndents } from "common-tags";
import { Listener } from "discord-akairo";
import { Message } from "discord.js";

export default class MessageTokenFilteringListener extends Listener {
  public constructor() {
    super("messageTokenFiltering", {
      emitter: "client",
      event: "message",
      category: "client",
    });
  }

  public async exec(message: Message): Promise<Message | undefined> {
    const matches = /([\w-]+={0,2})\.([\w-]+={0,2})\.([\w-]+={0,2})/g.exec(
      message.content,
    );
    return !matches ||
      BigInt(Buffer.from(matches ? matches[1] : "", "base64").toString()) === 0n
      ? undefined
      : message.channel
          .send(
            stripIndents`<@${message.author.id}>, the message you posted contained a bot token, you should reset it!
				> Go to <https://discordapp.com/developers/applications> and then click on the application that corresponds with your bot
				> Click "Bot" on the left side
				> Click the "Regenerate" button and then "Yes, do it!" on the popup.
				https://i.imgur.com/XtQsR9s.png`,
          )
          .then(() =>
            !message.deletable
              ? undefined
              : message.delete({
                  reason: "Token Filtering: Message contained bot token",
                }),
          );
  }
}
