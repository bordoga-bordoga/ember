import { Listener } from "discord-akairo";
import { Logger } from "winston";

import { EVENTS, TOPICS } from "../../logger";

export default class DiscrdDebugListener extends Listener {
  public constructor() {
    super("discordDebug", {
      emitter: "client",
      event: "debug",
      category: "client",
    });
  }

  public exec(info: string): Logger | undefined {
    return this.client.config.debugging
      ? this.client.logger.silly(info, {
          topic: TOPICS.DISCORD,
          event: EVENTS.DEBUG,
        })
      : undefined;
  }
}
