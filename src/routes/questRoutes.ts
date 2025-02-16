import { Router } from 'express';
import { questController } from '../controllers/QuestController';

const router = Router();

router.post('/quests', questController.createQuest);
router.get('/quests', questController.getAllQuests);
router.get('/quests/:id', questController.getQuestById);
router.put('/quests/:id', questController.updateQuest);
router.delete('/quests/:id', questController.deleteQuest);
router.delete('/quests/questions/:id', questController.deleteQuestWithQuestions);
router.get('/quests/email/:email', questController.getQuestsByUserEmail);
router.get('/quests/need/:id', questController.getUserQuestsByTitle);
router.post('/quests/add-quest-to-user', questController.addUserToQuest);
//@ts-ignore
router.post('/quests/with-questions', questController.createQuestWithQuestions);
router.get('/quests/count/get', questController.countQuestionsPerQuest);
router.get('/quests/count/raw', questController.countQuestionsPerQuestRaw);
// router.delete('/quests/soft/:id', questController.softDeleteQuestion);

export { router as questRoutes };
