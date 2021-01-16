import { Listener } from "discord-akairo";
import { Logger } from "winston";

import { EVENTS, TOPICS } from "../../logger";

export default class DiscordErrorListener extends Listener {
  public constructor() {
    super("unhandledRejection", {
      emitter: "process",
      event: "unhandledRejection",
      category: "process",
    });
  }

  public exec(error: Error): Logger {
    return this.client.logger.warn(`${error.message}\n${error.stack ?? ""}`, {
      topic: TOPICS.DISCORD,
      event: EVENTS.DEBUG,
    });
  }
}
