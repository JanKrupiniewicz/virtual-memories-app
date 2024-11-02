import { defineConfig } from "drizzle-kit";

require("dotenv").config();

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
  strict: true,
});
