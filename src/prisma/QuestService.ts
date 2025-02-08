import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class QuestService {
    async createQuest(title: string, description: string) {
        try {
            const quest = await prisma.quest.create({
                data: { title, description },
            });
            return quest;
        } catch (error) {
            console.error('Error creating quest:', error);
            throw new Error('Error creating quest');
        }
    }

    async getAllQuests() {
        try {
            return await prisma.quest.findMany();
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw new Error('Error fetching quests');
        }
    }

    async getQuestById(id: number) {
        try {
            const quest = await prisma.quest.findUnique({
                where: { id },
            });
            if (!quest) throw new Error('Quest not found');
            return quest;
        } catch (error) {
            console.error('Error fetching quest by ID:', error);
            throw new Error('Error fetching quest by ID');
        }
    }

    async updateQuest(id: number, title: string, description: string) {
        try {
            const quest = await prisma.quest.update({
                where: { id },
                data: { title, description },
            });
            return quest;
        } catch (error) {
            console.error('Error updating quest:', error);
            throw new Error('Error updating quest');
        }
    }

    async deleteQuest(id: number) {
        try {
            await prisma.quest.delete({
                where: { id },
            });
            return { message: 'Quest deleted successfully' };
        } catch (error) {
            console.error('Error deleting quest:', error);
            throw new Error('Error deleting quest');
        }
    }
}

export const questService = new QuestService();
