import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { MemoriesSchema } from "@/db/schema/memories";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const memories = await db.query.memories.findMany();
  return res.json(memories);
}
