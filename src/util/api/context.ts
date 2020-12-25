import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export type Context = {
  readonly prisma: PrismaClient;
};

export const createContext = (): Context => ({
  prisma,
});
