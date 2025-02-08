import { User } from '../models/User';

class UserService {
    async createUser(username: string, email: string) {
        try {
            const user = await User.create({ username, email });
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Error creating user');
        }
    }

    async getAllUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Error fetching users');
        }
    }

    async getUserById(id: number) {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error('User not found');
            return user;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw new Error('Error fetching user by ID');
        }
    }

    async updateUser(id: number, username: string, email: string) {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error('User not found');
            // @ts-ignore
            user.username = username;
            // @ts-ignore
            user.email = email;
            await user.save();
            return user;
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Error updating user');
        }
    }

    async deleteUser(id: number) {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error('User not found');
            await user.destroy();
            return { message: 'User deleted successfully' };
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Error deleting user');
        }
    }
}

export const userService = new UserService();
