import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
    async createUser(username: string, email: string) {
        return prisma.user.create({ data: { username, email } });
    }

    async getAllUsers() {
        return prisma.user.findMany();
    }

    async getUserById(id: number) {
        return prisma.user.findUnique({ where: { id } });
    }

    async updateUser(id: number, username: string, email: string) {
        return prisma.user.update({ where: { id }, data: { username, email } });
    }

    async deleteUser(id: number) {
        return prisma.user.delete({ where: { id } });
    }
}
