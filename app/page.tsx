import { MemoriesSchema } from "@/db/schema/memories";
import { db } from "@/db";

export default async function Home() {
  const memories: Omit<Extract<MemoriesSchema, { mode: "create" }>, "mode">[] =
    await db.query.memories.findMany();

  return (
    <div>
      <h1>Memories</h1>
      <ul>
        {memories.map((memory, itr) => (
          <li key={itr}>{memory.title}</li>
        ))}
      </ul>
    </div>
  );
}
