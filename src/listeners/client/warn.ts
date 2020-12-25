import { Listener } from "discord-akairo";
import { Logger } from "winston";

import { EVENTS, TOPICS } from "../../logging/logger";

export default class WarnListener extends Listener {
  public constructor() {
    super("warn", {
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
