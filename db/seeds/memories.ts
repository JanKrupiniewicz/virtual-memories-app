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
      photoUrl: faker.image.urlLoremFlickr({
        width: 640,
        height: 480,
        category: ["nature", "city", "people", "animals", "food", "abstract"][
          Math.floor(Math.random() * 6)
        ],
      }),
      latitude: faker.number.float({ min: -90, max: 90 }),
      longitude: faker.number.float({ min: -180, max: 180 }),
      category: randomCategory(),
      isPublic: Math.random() > 0.5,
    });
  }
  return data;
};

export async function seedMemories(db: DB) {
  await db.insert(memories).values(mock());
}
