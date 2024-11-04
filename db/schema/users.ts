import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { memories } from "./memories";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").notNull().primaryKey(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  user_role: varchar("user_role", { length: 256 }).notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  memories: many(memories),
}));

const baseSchema = createInsertSchema(users, {
  username: (schema) => schema.username.min(1).max(256),
  email: (schema) => schema.email.min(1).max(256),
  password: (schema) => schema.password.min(1).max(256),
  user_role: (schema) => schema.user_role.min(1).max(256),
}).pick({
  username: true,
  email: true,
  password: true,
  user_role: true,
});

export const signUpUserSchema = baseSchema;
export type SignUpUserSchema = z.infer<typeof signUpUserSchema>;

export const updateUserSchema = z.object({
  id: z.number().min(1),
  username: baseSchema.shape.username.optional(),
  email: baseSchema.shape.email.optional(),
  password: baseSchema.shape.password.optional(),
  user_role: baseSchema.shape.user_role.optional(),
});
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const signInUserSchema = z.object({
  email: baseSchema.shape.email,
  password: baseSchema.shape.password,
});
export type SignInUserSchema = z.infer<typeof signInUserSchema>;
