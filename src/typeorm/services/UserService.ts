import { Repository } from 'typeorm';
import { User } from '../models/User';
import { typeormDataSource } from '../../db/typeorm';

class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = typeormDataSource.getRepository(User);
    }

    async createUser(username: string, email: string): Promise<User> {
        try {
            const user = this.userRepository.create({ username, email });
            return await this.userRepository.save(user);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Error creating user');
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Error fetching users');
        }
    }

    async getUserById(id: number): Promise<User> {
        try {
            const user = await this.userRepository.findOneBy({ id });
            if (!user) throw new Error('User not found');
            return user;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw new Error('Error fetching user by ID');
        }
    }

    async updateUser(id: number, username: string, email: string): Promise<User> {
        try {
            const user = await this.userRepository.findOneBy({ id });
            if (!user) throw new Error('User not found');
            user.username = username;
            user.email = email;
            return await this.userRepository.save(user);
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Error updating user');
        }
    }

    async deleteUser(id: number): Promise<{ message: string }> {
        try {
            const result = await this.userRepository.delete(id);
            if (result.affected === 0) throw new Error('User not found');
            return { message: 'User deleted successfully' };
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Error deleting user');
        }
    }
}

export const userService = new UserService();
