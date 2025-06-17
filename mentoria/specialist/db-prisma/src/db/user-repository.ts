import { PrismaClient } from "@prisma/client";
import type User from "../model/user";

export default class UserRepository {
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async save(user: any): Promise<any> {
    return this.db.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
  }

  async getById(id: number): Promise<any> {
    return this.db.user.findUnique({
      where: { id },
    });
  }

  async fetchAll(): Promise<any[]> {
    return this.db.user.findMany();
  }

  async delete(id: number): Promise<any> {
    return this.db.user.delete({
      where: { id },
    });
  }
}
