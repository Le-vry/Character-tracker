declare module 'prisma' {
  import { PrismaClient } from '@prisma/client';
  export const prisma: PrismaClient;
  export default prisma;
}
