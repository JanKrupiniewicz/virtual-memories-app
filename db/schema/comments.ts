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
import { users } from "./users";

export const comments = pgTable("comments", {
  id: serial("id").notNull().primaryKey(),
  memoryId: varchar("memory_id"),
  userId: varchar("user_id"),
  description: text("description"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  memory: one(memories, {
    fields: [comments.memoryId],
    references: [memories.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));

export const commentsSchema = createInsertSchema(comments, {
  memoryId: (schema) => schema.memoryId,
  userId: (schema) => schema.userId,
  description: (schema) => schema.description.nullable(),
}).pick({
  memoryId: true,
  userId: true,
  description: true,
});

export type CommentsSchema = z.infer<typeof commentsSchema>;
