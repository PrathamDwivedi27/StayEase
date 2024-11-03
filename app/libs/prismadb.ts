import { PrismaClient } from "@prisma/client";

declare global {
  let prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

export default client;

// In this code, you're setting up a singleton instance of Prisma Client 
// to ensure that only one instance is used across your application, especially in a server environment like Next.js. 
//This approach optimizes Prisma's usage and avoids potential issues with too many database connections being opened.
