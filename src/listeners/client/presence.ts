import { Listener } from "discord-akairo";
import { Presence } from "discord.js";

/**
 * Defines how to set the presence of the bot as soon as we have a heartbeat from Discord
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Listener | akairo.Listener}
 */
export default class PresenceListener extends Listener {
  public constructor() {
    super("presence", {
      emitter: "client",
      category: "client",
      event: "ready",
    });
  }

  /**
   * Main execution procedure for setting the bot's {@link https://discord.js.org/#/docs/main/stable/class/Presence | presence}.
   *
   * @remarks
   * This is required by Akairo.
   *
   * @returns If client.config.commandCenter, a message sent to client.owner announcing the bot is active.
   */
  public async exec(): Promise<Presence | undefined> {
    return this.client.user?.setPresence({
      activity: { name: "to the universe.", type: "LISTENING" },
    });
  }
}
