import { Request, Response } from 'express';
import { questService as sequelizeQuestService } from '../sequalize/services/QuestService';
import { questService as typeormQuestService } from '../typeorm/services/QuestService';
import { questService as prismaQuestService } from '../prisma/QuestService';
import dotenv from 'dotenv';
dotenv.config();

const ORM = process.env.ORM || 'sequelize';
let questService: any;

switch (ORM) {
    case 'sequelize':
        questService = sequelizeQuestService;
        break;
    case 'typeorm':
        questService = typeormQuestService;
        break;
    case 'prisma':
        questService = prismaQuestService;
        break;
    default:
        questService = sequelizeQuestService;
        break;
}

class QuestController {
    async createQuest(req: Request, res: Response) {
        const { title, description } = req.body;
        try {
            const quest = await questService.createQuest(title, description);
            res.status(201).json(quest);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getAllQuests(req: Request, res: Response) {
        try {
            const quests = await questService.getAllQuests();
            res.status(200).json(quests);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getQuestById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const quest = await questService.getQuestById(Number(id));
            res.status(200).json(quest);
        } catch (error) {
            res.status(404).json({ error: (error as Error).message });
        }
    }

    async updateQuest(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description } = req.body;
        try {
            const quest = await questService.updateQuest(Number(id), title, description);
            res.status(200).json(quest);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deleteQuest(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await questService.deleteQuest(Number(id));
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export const questController = new QuestController();
