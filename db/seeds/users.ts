import { faker } from "@faker-js/faker";
import { DB } from "@/db";
import { users, SignUpUserSchema } from "@/db/schema/users";

const mockUsers = () => {
  const data: SignUpUserSchema[] = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ memorable: true, length: 8 }),
      userRole: "user",
    });
  }

  return data;
};

export async function seedUsers(db: DB) {
  await db.insert(users).values(mockUsers());
}
