import { Quest } from '../models/Quest';
import { typeormDataSource } from '../../db/typeorm';
import { Repository } from 'typeorm';

class QuestService {
    private questRepository: Repository<Quest>;

    constructor() {
        this.questRepository = typeormDataSource.getRepository(Quest);
    }

    async createQuest(title: string, description: string) {
        try {
            const quest = this.questRepository.create({ title, description });
            await this.questRepository.save(quest);
            return quest;
        } catch (error) {
            console.error('Error creating quest:', error);
            throw new Error('Error creating quest');
        }
    }

    async getAllQuests() {
        try {
            return await this.questRepository.find();
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw new Error('Error fetching quests');
        }
    }

    async getQuestById(id: number) {
        try {
            const quest = await this.questRepository.findOne({ where: { id } });
            if (!quest) throw new Error('Quest not found');
            return quest;
        } catch (error) {
            console.error('Error fetching quest by ID:', error);
            throw new Error('Error fetching quest by ID');
        }
    }

    async updateQuest(id: number, title: string, description: string) {
        try {
            const quest = await this.getQuestById(id);
            quest.title = title;
            quest.description = description;
            return await this.questRepository.save(quest);
        } catch (error) {
            console.error('Error updating quest:', error);
            throw new Error('Error updating quest');
        }
    }

    async deleteQuest(id: number) {
        try {
            const quest = await this.getQuestById(id);
            await this.questRepository.remove(quest);
            return { message: 'Quest deleted successfully' };
        } catch (error) {
            console.error('Error deleting quest:', error);
            throw new Error('Error deleting quest');
        }
    }
}

export const questService = new QuestService();
