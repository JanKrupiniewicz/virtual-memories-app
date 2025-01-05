import {
  serial,
  text,
  integer,
  varchar,
  pgTable,
  real,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { comments } from "./comments";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = [
  "work",
  "personal",
  "family",
  "friends",
  "travel",
  "food",
  "sports",
  "music",
  "movies",
  "other",
] as const;

export const categoryEnum = pgEnum("category", categories);

export const memories = pgTable("memories", {
  id: serial("id").notNull().primaryKey(),
  userId: integer("user_id"),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  photoUrl: varchar("photo_url", { length: 256 }),
  latitude: real("latitude"),
  longitude: real("longitude"),
  category: categoryEnum().notNull().default("other"),
  isPublic: boolean("is_public").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const memoriesRelations = relations(memories, ({ one, many }) => ({
  user: one(users, {
    fields: [memories.userId],
    references: [users.id],
  }),
  comments: many(comments),
}));

const baseSchema = createInsertSchema(memories, {
  userId: (schema) => schema.userId.min(1),
  title: (schema) => schema.title.min(1).max(256),
  description: (schema) => schema.description.min(1),
  photoUrl: (schema) => schema.photoUrl.max(256),
  latitude: (schema) => schema.latitude.min(-90).max(90),
  longitude: (schema) => schema.longitude.min(-180).max(180),
  category: (schema) => schema.category,
  isPublic: (schema) => schema.isPublic,
  createdAt: (schema) => schema.createdAt,
}).pick({
  userId: true,
  title: true,
  description: true,
  photoUrl: true,
  latitude: true,
  longitude: true,
  category: true,
  isPublic: true,
  createdAt: true,
});

export const createMemoriesSchema = z.object({
  userId: baseSchema.shape.userId,
  title: baseSchema.shape.title,
  description: baseSchema.shape.description,
  photoUrl: baseSchema.shape.photoUrl.optional(),
  latitude: baseSchema.shape.latitude,
  longitude: baseSchema.shape.longitude,
  category: baseSchema.shape.category,
  isPublic: baseSchema.shape.isPublic,
});

export type CreateMemoriesSchema = z.infer<typeof createMemoriesSchema>;

export const updateMemoriesSchema = z.object({
  id: z.number().min(1),
  title: baseSchema.shape.title.optional(),
  description: baseSchema.shape.description.optional(),
  photoUrl: baseSchema.shape.photoUrl.optional(),
  latitude: baseSchema.shape.latitude.optional(),
  longitude: baseSchema.shape.longitude.optional(),
  category: baseSchema.shape.category.optional(),
  isPublic: baseSchema.shape.isPublic.optional(),
  createdAt: baseSchema.shape.createdAt.optional(),
});

export type UpdateMemoriesSchema = z.infer<typeof updateMemoriesSchema>;
