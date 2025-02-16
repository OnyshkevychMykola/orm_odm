import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { UserRepository } from "./repository/UserRepository";
import NodeCache from "node-cache";

export class UserService {
    private userRepo: UserRepository;
    private cache: NodeCache;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
        this.cache = new NodeCache();
    }

    async createUser(username: string, email: string) {
        try {
            return await this.userRepo.createUser(username, email);
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Error creating user");
        }
    }

    async getAllUsers() {
        try {
            return await this.userRepo.getAllUsers();
        } catch (error) {
            console.error("Error fetching users:", error);
            throw new Error("Error fetching users");
        }
    }

    async getUserById(id: number) {
        try {
            const cachedUser = this.cache.get(id.toString());
            if (cachedUser) {
                return cachedUser;
            }

            const user = await this.userRepo.getUserById(id);
            if (!user) throw new Error("User not found");

            this.cache.set(id.toString(), user, 3600);

            return user;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw new Error("Error fetching user by ID");
        }
    }

    async updateUser(id: number, username: string, email: string) {
        try {
            return await this.userRepo.updateUser(id, username, email);
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Error updating user");
        }
    }

    async deleteUser(id: number) {
        try {
            await this.userRepo.deleteUser(id);
            return { message: "User deleted successfully" };
        } catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Error deleting user");
        }
    }

    async deleteUserWithQuests(userId: number) {
        return await prisma.$transaction(async (prisma) => {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: { quests: { include: { questions: true } } }
            });

            if (!user || user.quests.length === 0) {
                throw new Error('User not found or has no quests. Transaction canceled.');
            }

            const questIds = user.quests.map(q => q.id);

            await prisma.question.deleteMany({
                where: { questId: { in: questIds } }
            });

            await prisma.quest.deleteMany({
                where: { id: { in: questIds } }
            });

            await prisma.user.delete({
                where: { id: userId }
            });

            return { message: 'User and related quests deleted successfully' };
        });
    }

}
const userRepo = new UserRepository();
export const userService = new UserService(userRepo);
