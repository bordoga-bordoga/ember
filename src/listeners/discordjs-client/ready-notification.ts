import { Listener } from "discord-akairo";
import { Logger } from "winston";

import { TOPICS, EVENTS } from "../../logger";

/**
 * Defines how to announce the bot is active as soon as we have a heartbeat from Discord
 *
 * @remarks
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Listener | akairo.Listener}
 */
export default class ReadyNotificationListener extends Listener {
  public constructor() {
    super("readyNotification", {
      emitter: "client",
      category: "client",
      event: "ready",
    });
  }

  /**
   * Main execution procedure for the announcement.
   *
   * @remarks
   * This is required by Akairo.
   *
   * Instead of using the {@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=users | cached client.users}, this method finds the owner in the command center server if it is defined.
   *
   * @returns If client.config.commandCenter, a message sent to client.owner announcing the bot is active.
   */
  public exec(): Logger {
    /* return this.client.guilds
      .fetch(botClient.config.commandCenter)
      .then((guild) => guild.members.fetch(botClient.config.owner))
      .then((member) =>
        member.send(
          `${this.client.user?.tag ?? "Bot"} is now active as ${
            this.client.user?.id ?? "NaN"
          }.`,
        ),
      )
      .then((message) =>
        this.client.logger.info(message.content, {
          topic: TOPICS.DISCORD,
          event: EVENTS.READY,
        }),
      ); */
    return this.client.logger.info(
      `${this.client.user?.tag ?? "Bot"} is now active as ${
        this.client.user?.id ?? "NaN"
      }.`,
      {
        topic: TOPICS.DISCORD,
        event: EVENTS.READY,
      },
    );
  }
}
