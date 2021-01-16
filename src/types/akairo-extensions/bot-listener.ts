import { Listener } from "discord-akairo";

import BotClient from "./bot-client";

export default abstract class BotListener extends Listener {
  public readonly client!: BotClient;
}
