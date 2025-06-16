import { PrismaClient } from "@prisma/client"
import type User from "../model/user"

export default class UserRepository {
  private db: PrismaClient

  constructor() {
    this.db = new PrismaClient()
  }

  async save(user: any): Promise<any> {
    return this.db.user.create({data: user})
  }
}