import { PrismaClient } from './src/generated/client.ts';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Attempting to query database...');
    try {
        const count = await prisma.character.count();
        console.log('Character count:', count);
    } catch (e) {
        console.error('Error querying database:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
