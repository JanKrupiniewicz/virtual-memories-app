
CREATE TYPE category AS ENUM ('work', 'personal', 'family', 'friends', 'travel', 'food', 'sports', 'music', 'movies', 'other');

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "memories" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"title" varchar(256) NOT NULL,
	"description" text,
	"latitude" numeric(10, 6),
	"longitude" numeric(10, 6),
	"category" "category" DEFAULT 'other' NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"memory_id" integer,
	"url" varchar(256) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"user_role" varchar(256) NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
