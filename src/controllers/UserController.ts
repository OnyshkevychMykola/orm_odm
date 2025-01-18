import { Request, Response } from 'express';
import { userService } from '../services/UserService';

class UserController {
    async createUser(req: Request, res: Response) {
        const { username, email } = req.body;
        try {
            const user = await userService.createUser(username, email);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await userService.getUserById(Number(id));
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { username, email } = req.body;
        try {
            const user = await userService.updateUser(Number(id), username, email);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await userService.deleteUser(Number(id));
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const userController = new UserController();
