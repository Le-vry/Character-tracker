// place files you want to import through the `$lib` alias in this folder.
import { env } from '$env/dynamic/private';
import { createRequire } from 'module';

// The generated Prisma client in `src/generated/prisma` is CommonJS.
// The project package.json sets "type": "module", so Node treats
// .js files as ESM which would make `require` undefined inside the
// generated client. Use `createRequire` to load the CommonJS client.
const require = createRequire(import.meta.url);
const { PrismaClient } = require('../generated/prisma/client');

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