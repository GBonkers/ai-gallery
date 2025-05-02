// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// give TypeScript a properly-typed handle on the global scope
type GlobalWithPrisma = typeof globalThis & {
  prisma?: PrismaClient;
};

const globalWithPrisma = globalThis as GlobalWithPrisma;

// either reuse the existing client or create a new one
export const prisma = globalWithPrisma.prisma ?? new PrismaClient();

// cache it in dev so it survives hot-reloads
if (process.env.NODE_ENV !== 'production') {
  globalWithPrisma.prisma = prisma;
}
