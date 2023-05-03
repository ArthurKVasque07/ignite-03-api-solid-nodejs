import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";

// DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;

    // utiliza o deploy porque ele pula a etapa de verificação das migrations, apenas executa uma a uma
    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          // cascade garante que tudo sera apagado na casacata, ex FK, Index
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );
      },
    };
  },
};
