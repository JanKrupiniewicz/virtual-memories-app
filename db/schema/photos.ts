import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { memories } from "./memories";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const photos = pgTable("photos", {
  id: serial("id").notNull().primaryKey(),
  memoryId: integer("memory_id"),
  url: varchar("url", { length: 256 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const photosRelations = relations(photos, ({ one }) => ({
  memory: one(memories, {
    fields: [photos.memoryId],
    references: [memories.id],
  }),
}));

export const photosSchema = createInsertSchema(photos, {
  memoryId: (schema) => schema.memoryId.min(1),
  url: (schema) => schema.url.min(1).max(256),
  description: (schema) => schema.description.nullable(),
}).pick({
  memoryId: true,
  url: true,
  description: true,
});

export type PhotosSchema = z.infer<typeof photosSchema>;
