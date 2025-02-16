import {Request, Response} from 'express';
import {questService as sequelizeQuestService} from '../sequalize/services/QuestService';
import {questService as typeormQuestService} from '../typeorm/services/QuestService';
import {questService as prismaQuestService} from '../prisma/QuestService';
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

    async getQuestsByUserEmail(req: Request, res: Response) {
        const { email } = req.params;
        try {
            const result = await questService.getQuestsByUserEmail(email);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deleteQuestWithQuestions(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await questService.deleteQuestWithQuestions(Number(id));
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getUserQuestsByTitle(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await questService.getUserQuestsByTitle(Number(id));
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async addUserToQuest(req: Request, res: Response) {
        const { userId, questId } = req.body;
        try {
            const result = await questService.addUserToQuest(Number(userId), Number(questId));
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async createQuestWithQuestions(req: Request, res: Response) {
        try {
            const { title, description, questions } = req.body;

            if (typeof title !== 'string' || !Array.isArray(questions) || questions.length === 0) {
                return res.status(400).json({ error: 'Invalid input data' });
            }

            if (!questions.every(q => typeof q.text === 'string' && typeof q.answer === 'string')) {
                return res.status(400).json({ error: 'Each question must have a text and an answer' });
            }

            const newQuest = await questService.createQuestWithQuestions(title, description, questions);

            return res.status(201).json(newQuest);
        } catch (error) {
            console.error('Error creating quest with questions:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async countQuestionsPerQuestRaw(req: Request, res: Response) {
        try {
            const result = await questService.countQuestionsPerQuestRaw();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async countQuestionsPerQuest(req: Request, res: Response) {
        try {
            const result = await questService.countQuestionsPerQuest();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    // async softDeleteQuestion(req: Request, res: Response) {
    //     const { id } = req.params;
    //     try {
    //         const result = await questService.softDeleteQuestion(Number(id));
    //         res.status(200).json(result);
    //     } catch (error) {
    //         res.status(500).json({ error: (error as Error).message });
    //     }
    // }

}

export const questController = new QuestController();
