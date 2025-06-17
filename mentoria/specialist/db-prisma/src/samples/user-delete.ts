import UserRepository from "../db/user-repository";
import { faker } from "@faker-js/faker";

async function execute() {
  const repo = new UserRepository();

  const user = await repo.delete(1);

  console.log("user successfully deleted");

  const users = await repo.fetchAll();

  console.log(users);
}

execute();
