import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { memories } from "./memories";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { comments } from "./comments";

export const users = pgTable("users", {
  id: serial("id").notNull().primaryKey(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  userRole: varchar("user_role", { length: 256 }).notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  memories: many(memories),
  comments: many(comments),
}));

const baseSchema = createInsertSchema(users, {
  username: (schema) => schema.username.min(1).max(256),
  email: (schema) => schema.email.min(1).max(256),
  password: (schema) => schema.password.min(1).max(256),
  userRole: (schema) => schema.userRole.min(1).max(256),
}).pick({
  username: true,
  email: true,
  password: true,
  userRole: true,
});

export const signUpUserSchema = baseSchema;
export type SignUpUserSchema = z.infer<typeof signUpUserSchema>;

export const updateUserSchema = z.object({
  id: z.number().min(1),
  username: baseSchema.shape.username.optional(),
  email: baseSchema.shape.email.optional(),
  password: baseSchema.shape.password.optional(),
  userRole: baseSchema.shape.userRole.optional(),
});
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const signInUserSchema = z.object({
  email: baseSchema.shape.email,
  password: baseSchema.shape.password,
});
export type SignInUserSchema = z.infer<typeof signInUserSchema>;
