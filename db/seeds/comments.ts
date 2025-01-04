import { faker } from "@faker-js/faker";
import { DB } from "@/db";
import { comments, CommentsSchema } from "@/db/schema/comments";

const mockComments = () => {
  const data: CommentsSchema[] = [];

  for (let i = 0; i < 300; i++) {
    data.push({
      memoryId: faker.number.int({ min: 1, max: 100 }),
      userId: faker.number.int({ min: 1, max: 100 }),
      description: faker.lorem.paragraph(),
    });
  }

  return data;
};

export async function seedComments(db: DB) {
  await db.insert(comments).values(mockComments());
}
