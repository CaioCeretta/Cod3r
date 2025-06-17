import UserRepository from "../db/user-repository";
import { faker } from "@faker-js/faker";

async function execute() {
  const repo = new UserRepository();

  const user = await repo.getById(1);

  console.log(user);
}

execute();
