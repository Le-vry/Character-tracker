// place files you want to import through the `$lib` alias in this folder.
import { env } from '$env/dynamic/private';
import { createRequire } from 'module';
import path from 'path';

// The generated Prisma client in `src/generated/prisma` is CommonJS.
// Use `createRequire` to load the CommonJS client from an absolute
// path (based on process.cwd()) so it resolves correctly after build.
const require = createRequire(import.meta.url);
const clientPath = path.join(process.cwd(), 'src', 'generated', 'prisma', 'client');
const { PrismaClient } = require(clientPath);

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const databaseUrl = env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set. Configure it in your environment or .env file.');
}

const pool = new Pool({
    connectionString: databaseUrl
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });