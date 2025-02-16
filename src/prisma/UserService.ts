import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserService {
    async createUser(username: string, email: string) {
        try {
            const user = await prisma.user.create({
                data: { username, email },
            });
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Error creating user');
        }
    }

    async getAllUsers() {
        try {
            return await prisma.user.findMany();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Error fetching users');
        }
    }

    async getUserById(id: number) {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
            });
            if (!user) throw new Error('User not found');
            return user;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw new Error('Error fetching user by ID');
        }
    }

    async updateUser(id: number, username: string, email: string) {
        try {
            const user = await prisma.user.update({
                where: { id },
                data: { username, email },
            });
            return user;
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Error updating user');
        }
    }

    async deleteUser(id: number): Promise<{ message: string }> {
        try {
            await prisma.user.delete({
                where: { id },
            });
            return { message: 'User deleted successfully' };
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Error deleting user');
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

export const userService = new UserService();
