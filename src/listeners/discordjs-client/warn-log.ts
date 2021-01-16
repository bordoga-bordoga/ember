import { Listener } from "discord-akairo";
import { Logger } from "winston";

import { EVENTS, TOPICS } from "../../logger";

export default class DiscordWarnListener extends Listener {
  public constructor() {
    super("discordWarn", {
      emitter: "client",
      event: "warn",
      category: "client",
    });
  }

  public exec(info: string): Logger {
    return this.client.logger.warn(info, {
      topic: TOPICS.DISCORD,
      event: EVENTS.DEBUG,
    });
  }
}
