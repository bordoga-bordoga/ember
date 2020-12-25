import { Listener } from "discord-akairo";
import { Logger } from "winston";

import { EVENTS, TOPICS } from "../../logging/logger";

export default class DebugListener extends Listener {
  public constructor() {
    super("debug", {
      emitter: "client",
      event: "debug",
      category: "client",
    });
  }

  public exec(info: string): Logger | undefined {
    return this.client.config.debugging
      ? this.client.logger.debug(info, {
          topic: TOPICS.DISCORD,
          event: EVENTS.DEBUG,
        })
      : undefined;
  }
}
