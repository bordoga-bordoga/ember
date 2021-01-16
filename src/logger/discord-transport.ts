/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/prefer-readonly-type */
import { Message, MessageEmbed, WebhookClient } from "discord.js";
import os from "os";
import Transport, { TransportStreamOptions } from "winston-transport";

import { COLORS } from "../types/colors";

/**
 * Options for Discord transport for winston
 */
type DiscordTransportOptions = TransportStreamOptions & {
  readonly discord?: boolean;
  readonly webhookID: string;
  readonly webhookToken: string;
};

type LoggerElements = Record<string, unknown> & {
  readonly error: string;
  readonly level: string;
  readonly message: string;
};

export default class DiscordTransport extends Transport {
  /** Available colors for discord messages */
  private static readonly colorCodes: { readonly [key: string]: number } = {
    error: COLORS.DARK_RED,
    warn: COLORS.RED,
    help: COLORS.DARK_ORANGE,
    data: COLORS.YELLOW,
    info: COLORS.DARK_GREEN,
    debug: COLORS.GREEN,
    prompt: COLORS.DARK_BLUE,
    verbose: COLORS.DARK_BLUE,
    input: COLORS.DARK_PURPLE,
    silly: COLORS.PURPLE,
  };

  /** Webhook obtained from Discord */
  private readonly webhook: WebhookClient | undefined;

  public constructor(options: DiscordTransportOptions) {
    super(options);
    this.webhook =
      options.discord === false
        ? undefined
        : new WebhookClient(options.webhookID, options.webhookToken);
  }

  /**
   * Function exposed to winston to be called when logging messages
   * @param info - Log message from winston
   * @param callback - Callback to winston to complete the log
   */
  public async log(
    info: LoggerElements,
    callback: { (): void },
    // eslint-disable-next-line functional/no-return-void
  ): Promise<void | Message> {
    return !this.webhook
      ? Promise.resolve().finally(() => callback())
      : this.webhook
          .send(
            new MessageEmbed()
              .setTitle(info.level.toUpperCase())
              .setAuthor(info.label)
              .setDescription(info.message)
              .setColor(DiscordTransport.colorCodes[info.level])
              .addField("Host", os.hostname()),
          )
          .finally(() => callback());
  }
}
