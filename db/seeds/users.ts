import { faker } from "@faker-js/faker";
import { DB } from "@/db";
import { users } from "../schema/users";

interface UserMock {
  username: string;
  email: string;
  password: string;
  user_role: string;
}

const mockUsers = (): UserMock[] => {
  const data: UserMock[] = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ memorable: true, length: 8 }),
      user_role: "user",
    });
  }

  return data;
};

export async function seedUsers(db: DB) {
  const usersToInsert = mockUsers();
  await db.insert(users).values(usersToInsert);
}
