import { Request, Response } from 'express';
import { questService } from '../services/QuestService';

class QuestController {
    async createQuest(req: Request, res: Response) {
        const { title, description } = req.body;
        try {
            const quest = await questService.createQuest(title, description);
            res.status(201).json(quest);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllQuests(req: Request, res: Response) {
        try {
            const quests = await questService.getAllQuests();
            res.status(200).json(quests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getQuestById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const quest = await questService.getQuestById(Number(id));
            res.status(200).json(quest);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateQuest(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description } = req.body;
        try {
            const quest = await questService.updateQuest(Number(id), title, description);
            res.status(200).json(quest);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteQuest(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await questService.deleteQuest(Number(id));
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const questController = new QuestController();
