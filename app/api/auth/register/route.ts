import { signUpUserSchema } from "@/db/schema/users";
import { NextResponse } from "next/server";
import { users } from "@/db/schema";
import { db } from "@/db";

export async function POST(req: Request) {
  const body = await req.json();
  const parsedBody = signUpUserSchema.parse(body);

  if (!parsedBody) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  console.log(parsedBody);

  const [result] = await db
    .insert(users)
    .values(parsedBody)
    .returning({ inserted: users.id });

  if (!result) {
    return NextResponse.json(
      { error: "Failed to insert memory" },
      { status: 500 }
    );
  }

  return NextResponse.json({ id: result.inserted }, { status: 201 });
}
