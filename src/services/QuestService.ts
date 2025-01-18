import { Quest } from '../models/Quest';

class QuestService {
    async createQuest(title: string, description: string) {
        try {
            const quest = await Quest.create({ title, description });
            return quest;
        } catch (error) {
            console.error('Error creating quest:', error);
            throw new Error('Error creating quest');
        }
    }

    async getAllQuests() {
        try {
            const quests = await Quest.findAll();
            return quests;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw new Error('Error fetching quests');
        }
    }

    async getQuestById(id: number) {
        try {
            const quest = await Quest.findByPk(id);
            if (!quest) throw new Error('Quest not found');
            return quest;
        } catch (error) {
            console.error('Error fetching quest by ID:', error);
            throw new Error('Error fetching quest by ID');
        }
    }

    async updateQuest(id: number, title: string, description: string) {
        try {
            const quest = await Quest.findByPk(id);
            if (!quest) throw new Error('Quest not found');
            quest.title = title;
            quest.description = description;
            await quest.save();
            return quest;
        } catch (error) {
            console.error('Error updating quest:', error);
            throw new Error('Error updating quest');
        }
    }

    async deleteQuest(id: number) {
        try {
            const quest = await Quest.findByPk(id);
            if (!quest) throw new Error('Quest not found');
            await quest.destroy();
            return { message: 'Quest deleted successfully' };
        } catch (error) {
            console.error('Error deleting quest:', error);
            throw new Error('Error deleting quest');
        }
    }
}

export const questService = new QuestService();
