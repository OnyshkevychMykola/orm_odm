import { Request, Response } from 'express';
import { userService as sequelizeUserService } from '../sequalize/services/UserService';
import { userService as typeormUserService } from '../typeorm/services/UserService';
import { userService as prismaUserService } from "../prisma/UserService";

import dotenv from 'dotenv';
dotenv.config();

const ORM = process.env.ORM || 'sequelize';

let userService: any;

switch (ORM) {
    case 'sequelize':
        userService = sequelizeUserService;
        break;
    case 'typeorm':
        console.log('sd')
        userService = typeormUserService;
        break;
    case 'prisma':
        userService = prismaUserService;
        break;
    default:
        userService = sequelizeUserService;
        break;
}

class UserController {
    async createUser(req: Request, res: Response) {
        const { username, email } = req.body;
        try {
            const user = await userService.createUser(username, email);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await userService.getUserById(Number(id));
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ error: (error as Error).message });
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { username, email } = req.body;
        try {
            const user = await userService.updateUser(Number(id), username, email);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await userService.deleteUser(Number(id));
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deleteUserWithQuests(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await userService.deleteUserWithQuests(Number(id));
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export const userController = new UserController();
