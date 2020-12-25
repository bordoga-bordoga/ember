import { VoiceChannel, Guild } from "discord.js";
import FuzzySearch from "fuzzy-search";

export default class VoiceUtils {
  /**
   *
   * @param guild - The {@link https://discord.js.org/#/docs/main/stable/class/Guild | Guild} to search in.
   * @param key - Either a {@link https://discord.js.org/#/docs/main/stable/typedef/Snowflake | Snowflake} or a string to search for.
   *
   * @returns A {@link https://discord.js.org/#/docs/main/stable/class/VoiceChannel | Voice Channel} if it exists in the {@link https://discord.js.org/#/docs/main/stable/class/Guild | Guild}, an {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error | Error} if the {@link https://discord.js.org/#/docs/main/stable/typedef/Snowflake | Snowflake} is not a {@link https://discord.js.org/#/docs/main/stable/class/VoiceChannel | Voice Channel}, otherwise {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined | undefined}.
   */
  public static readonly resolveVC = async function resolveVoiceChannel(
    guild: Guild,
    key: string,
  ): Promise<VoiceChannel | undefined> {
    return Promise.resolve(
      !Number.isNaN(Number(key)) && guild.channels.cache.has(key)
        ? guild.channels.cache.get(key)?.type === "voice"
          ? (guild.channels.cache.get(key) as VoiceChannel)
          : Promise.reject(new Error("That channel is not a voice channel"))
        : (new FuzzySearch(
            guild.channels.cache
              .filter((channel) => channel.type === "voice")
              .array(),
            ["name"],
          ).search(key)[0] as VoiceChannel),
    );
  };
}
