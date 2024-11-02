import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { UsersSchema } from "@/db/schema/users";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const users: Omit<UsersSchema, "mode">[] = await db.query.users.findMany();
  return res.json(users);
}
