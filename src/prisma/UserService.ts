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
}

export const userService = new UserService();
