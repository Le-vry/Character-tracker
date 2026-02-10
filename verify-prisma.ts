import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({connectionString});
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
