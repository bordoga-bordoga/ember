import { createLogger, format, Logform, transports } from "winston";

// TODO https://www.npmjs.com/package/winston-daily-rotate-file2 if we end up using pm2
import "winston-daily-rotate-file";

export enum TOPICS {
  DISCORD = "DISCORD",
  DISCORD_AKAIRO = "DISCORD_AKAIRO",
  METRICS = "METRICS",
  RPC = "RPC",
  UNHANDLED_REJECTION = "UNHANDLED_REJECTION",
}

export enum EVENTS {
  COMMAND_BLOCKED = "COMMAND_BLOCKED",
  COMMAND_CANCELLED = "COMMAND_CANCELLED",
  COMMAND_ERROR = "COMMAND_ERROR",
  COMMAND_FINISHED = "COMMAND_FINISHED",
  COMMAND_STARTED = "COMMAND_STARTED",
  CONNECT = "CONNECT",
  DEBUG = "DEBUG",
  DESTROY = "DESTROY",
  DISCONNECT = "DISCONNECT",
  ERROR = "ERROR",
  IDENTIFY = "IDENTIFY",
  INIT = "INIT",
  LOCKDOWN = "LOCKDOWN",
  MESSAGE_BLOCKED = "MESSAGE_BLOCKED",
  MUTE = "MUTE",
  READY = "READY",
  WARN = "WARN",
}

type Data = {
  readonly event?: string;
  readonly label?: string;
  readonly topic?: string;
};

export const logger = createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.label({ label: "BOT" }),
    format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
    format.printf((info: Logform.TransformableInfo): string => {
      const {
        timestamp,
        label,
        level,
        message,
        topic,
        event,
        ...rest
      }: Logform.TransformableInfo & Data = info;
      return `[${label ? `[${label}]` : ""}][${level.toUpperCase()}][${
        topic ? `[${topic}]` : ""
      }]${event ? `[${event}]` : ""}: ${message}${
        Object.keys(rest).length > 0
          ? `\n${JSON.stringify(rest, undefined, 2)}`
          : ""
      }`;
    }),
  ),
  transports: [
    new transports.Console({
      format: format.colorize({ level: true }),
      level: "info",
    }),
    new transports.DailyRotateFile({
      format: format.combine(format.timestamp(), format.json()),
      level: "info",
      dirname: "./logs/",
      filename: "AYBot-%DATE%.log",
      maxFiles: "14d",
    }),
    new transports.File({
      filename: "debugging.log",
      dirname: "./logs/",
      level: "debug",
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: "exceptions.log", dirname: "./logs/" }),
  ],
  exitOnError: false,
});
