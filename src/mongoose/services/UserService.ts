const { User } = require('../mongoose.schema');

class UserService {
    async createUser(username, email) {
        try {
            const user = new User({ username, email });
            await user.save();
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Error creating user');
        }
    }

    async getAllUsers() {
        try {
            return await User.find();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Error fetching users');
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findById(id);
            if (!user) throw new Error('User not found');
            return user;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw new Error('Error fetching user by ID');
        }
    }

    async updateUser(id, username, email) {
        try {
            const user = await User.findByIdAndUpdate(id, { username, email }, { new: true });
            if (!user) throw new Error('User not found');
            return user;
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Error updating user');
        }
    }

    async deleteUser(id) {
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) throw new Error('User not found');
            return { message: 'User deleted successfully' };
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Error deleting user');
        }
    }
}

module.exports = { userService: new UserService() };
