import { sql, Table } from "drizzle-orm";

import { db, DB } from "@/db";
import * as schema from "@/db/schema";
import * as seeds from "@/db/seeds/index";

async function resetTable(db: DB, table: Table) {
  return db.execute(sql`truncate table ${table} restart identity cascade`);
}

async function main() {
  const tablesToReset = [
    schema.memories,
    schema.users,
    schema.photos,
    schema.session,
  ];

  for (const table of tablesToReset) {
    await resetTable(db, table);
  }
  await seeds.seedMemories(db);
  await seeds.seedUsers(db);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding done!");
    process.exit(0);
  });
