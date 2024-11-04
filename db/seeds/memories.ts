import { memories, CreateMemoriesSchema } from "../schema/memories";
import { faker } from "@faker-js/faker";
import { categories } from "../schema/memories";
import { DB } from "@/db";

const randomCategory = () => {
  return categories[Math.floor(Math.random() * categories.length)];
};

const mock = () => {
  const data: CreateMemoriesSchema[] = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      userId: faker.number.int({ min: 1, max: 100 }),
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      latitude: faker.number.float({ min: -90, max: 90 }).toString(),
      longitude: faker.number.float({ min: -180, max: 180 }).toString(),
      category: randomCategory(),
      isPublic: false,
    });
  }
  return data;
};

export async function seedMemories(db: DB) {
  await db.insert(memories).values(mock());
}
