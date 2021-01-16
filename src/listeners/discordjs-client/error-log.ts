import { Listener } from "discord-akairo";
import { Logger } from "winston";

import { EVENTS, TOPICS } from "../../logger";

export default class DiscordErrorListener extends Listener {
  public constructor() {
    super("discordError", {
      emitter: "client",
      event: "error",
      category: "client",
    });
  }

  public exec(error: Error): Logger {
    return this.client.logger.error(error.message, {
      topic: TOPICS.DISCORD,
      event: EVENTS.DEBUG,
    });
  }
}
