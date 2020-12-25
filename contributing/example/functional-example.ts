/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-expression-statement */
import { Command } from "discord-akairo";
import { Message } from "discord.js";

/**
 * Defines how to respond to _ping.
 *
 * @remarks
 *
 * Example for programattically defining a command identical to {@link PingCommand} class-lessly using {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect | reflection}.
 *
 * @see {@link https://discord-akairo.github.io/#/docs/main/master/class/Command | Akairo Command}
 */
function PongCommand(): Command {
  const command: Command = Reflect.construct(
    Command,
    ["pong", { aliases: ["pong"], category: "example" }],
    new.target,
  ) as Command;

  /**
   * Main execution procedure for _ping
   *
   * @remarks
   * This is required by Akairo
   *
   * @param message - Will contain the {@link https://discord.js.org/#/docs/main/stable/class/Message | Message} object that hooked the command
   * @returns A message giving the latency between the bot client and Discord's servers
   */
  command.exec = async function executeCommand(
    message: Message,
  ): Promise<Message | void> {
    return (
      message.util?.send(Math.round(this.client.ws.ping).toString()) ??
      message.channel.send(Math.round(this.client.ws.ping).toString())
    );
  };
  return command;
}

Object.setPrototypeOf(PongCommand, Command);
Object.setPrototypeOf(PongCommand.prototype, Command.prototype);

export default PongCommand;
