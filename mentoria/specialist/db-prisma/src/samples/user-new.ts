import UserRepository from "../db/user-repository";
import { faker } from "@faker-js/faker";

async function execute() {
  const user = {
    id: 3,
    name: "john doe",
    email: "johndoee@gmail.com",
    password: "johndoe123",
  };

  const repo = new UserRepository();

  await repo.save(user);

  console.log("User successfully saved!");
}

execute();
