import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let _prisma: any = null;

export async function getPrisma() {
  if (!_prisma) {
    const { config } = await import('dotenv');
    config({ path: resolve(__dirname, '../.env') });

    const { PrismaClient } = await import('@prisma/client');
    const { PrismaNeon } = await import('@prisma/adapter-neon');

    const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
    _prisma = new PrismaClient({ adapter });
  }
  return _prisma as any;
}

export default getPrisma;
