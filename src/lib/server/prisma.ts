import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Singleton pattern to prevent multiple instances during dev hot reload
let prisma: PrismaClient;

if (import.meta.env.DEV) {
  // @ts-ignore
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} else {
  prisma = new PrismaClient();
}

export { prisma };