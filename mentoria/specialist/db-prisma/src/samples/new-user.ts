import UserRepository from "../db/user-repository"
import { faker } from "@faker-js/faker"

async function execute() {
  
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  const repo = new UserRepository()

  await repo.save(user)

  console.log('User successfully saved!')
}

execute()