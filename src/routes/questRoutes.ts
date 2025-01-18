import { Router } from 'express';
import { questController } from '../controllers/QuestController';

const router = Router();

router.post('/quests', questController.createQuest);
router.get('/quests', questController.getAllQuests);
router.get('/quests/:id', questController.getQuestById);
router.put('/quests/:id', questController.updateQuest);
router.delete('/quests/:id', questController.deleteQuest);

export { router as questRoutes };
