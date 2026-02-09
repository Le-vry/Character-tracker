import { PrismaClient } from '../src/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
  // Provide a typed property on globalThis to store the client between module reloads
  // eslint-disable-next-line no-var
  var __PRISMA_CLIENT__:
    | import('../src/generated/client').PrismaClient
    | undefined;

  interface GlobalThis {
    __PRISMA_CLIENT__?: import('../src/generated/client').PrismaClient;
  }
}

// Create or reuse the Prisma client (prevents exhausting connections during HMR)
const cached = globalThis.__PRISMA_CLIENT__;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma: PrismaClient = cached ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalThis.__PRISMA_CLIENT__ = prisma;
}
