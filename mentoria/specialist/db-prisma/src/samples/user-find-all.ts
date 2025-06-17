import UserRepository from "../db/user-repository";
import { faker } from "@faker-js/faker";

async function execute() {
  const repo = new UserRepository();

  const users = await repo.fetchAll();

  console.log(users);
}

execute();
