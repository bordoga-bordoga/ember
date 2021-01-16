import "dotenv/config";

import { config, createLogger, format, Logform, transports } from "winston";

import DiscordTransport from "./discord-transport";
import { EVENTS as EVENTS_ENUM } from "./events";
import NullTransport from "./null-transport";
import { TOPICS as TOPICS_ENUM } from "./topics";

// TODO https://www.npmjs.com/package/winston-daily-rotate-file2 if we end up using pm2
import "winston-daily-rotate-file";

export const logger = createLogger({
  levels: config.cli.levels,
  format: format.combine(
    format.label({ label: `Ember Bot (${process.pid})` }),
    format.errors({ stack: true }),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ level: true, message: true }),
        format.timestamp({ format: "HH:mm:ss" }),
        format.printf((info: Logform.TransformableInfo): string => {
          const {
            timestamp,
            label,
            level,
            message,
            topic,
            event,
            ...rest
          }: Logform.TransformableInfo & {
            readonly event?: string;
            readonly label?: string;
            readonly topic?: string;
          } = info;
          return `\u001B[7m${level}\u001B[0m ${
            timestamp as string
          } from \u001B[2m\u001B[36m${label ?? ""}\u001B[0m for ${
            event ?? "NO EVENT GIVEN"
          } in ${topic ?? "NO TOPIC GIVEN"} ⇒ ${message} ${
            Object.keys(rest).length > 0 ? JSON.stringify(rest) : ""
          }`;
        }),
      ),
      level: process.env.NODE_ENV === "development" ? "verbose" : "debug",
    }),
    new transports.DailyRotateFile({
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
      ),
      level: "debug",
      dirname: "./logs/",
      filename: "Ember-%DATE%.log",
      maxFiles: "30d",
    }),
    process.env.NO_DISCORD
      ? new NullTransport({})
      : new DiscordTransport({
          webhookID: process.env.webhookID ?? "",
          webhookToken: process.env.webhookToken ?? "",
          level: "info",
        }),
    new transports.File({
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
      ),
      filename: "debugging.log",
      dirname: "./logs/",
      level: process.env.NODE_ENV === "development" ? "silly" : "help",
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: "exceptions.log", dirname: "./logs/" }),
    new transports.Console(),
  ],
  exitOnError: false,
});

export const EVENTS = EVENTS_ENUM;
export const TOPICS = TOPICS_ENUM;
