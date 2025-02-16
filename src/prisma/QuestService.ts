import {PrismaClient} from '@prisma/client';

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

    async getQuestsByUserEmail(email: string) {
        try {
            const userWithQuests = await prisma.user.findUnique({
                where: { email },
                include: { quests: true },
            });

            if (!userWithQuests) {
                throw new Error('User not found');
            }

            return userWithQuests.quests;
        } catch (error) {
            console.error('Error fetching quests for user by email:', error);
            throw new Error('Error fetching quests');
        }
    }

    async deleteQuestWithQuestions(questId: number) {
        try {
            await prisma.question.deleteMany({
                where: { questId },
            });

            await prisma.quest.delete({
                where: { id: questId },
            });

            return { message: 'Quest and related questions deleted successfully' };
        } catch (error) {
            console.error('Error deleting quest and questions:', error);
            throw new Error('Error deleting quest');
        }
    }

    async getUserQuestsByTitle(userId: number) {
        try {
            console.log(userId)
            return await prisma.quest.findMany({
                where: {
                    users: {
                        some: {id: userId},
                    },
                    title: {
                        contains: 'Need',
                        mode: 'insensitive',
                    },
                },
            });
        } catch (error) {
            console.error('Error fetching user quests by title:', error);
            throw new Error('Error fetching quests');
        }
    }

    async addUserToQuest(userId: number, questId: number) {
        try {
            return await prisma.quest.update({
                where: {id: questId},
                data: {
                    users: {
                        connect: {id: userId},
                    },
                },
                include: {users: true},
            });
        } catch (error) {
            console.error('Error adding user to quest:', error);
            throw new Error('Error adding user to quest');
        }
    }

    async createQuestWithQuestions(title: string, description: string | null, questions: { text: string; answer: string }[]) {
        try {
            return await prisma.quest.create({
                data: {
                    title,
                    description,
                    questions: {
                        create: questions,
                    },
                },
                include: {
                    questions: true,
                },
            });
        } catch (error) {
            console.error('Error creating quest with questions:', error);
            throw new Error('Error creating quest');
        }
    }

    async countQuestionsPerQuest() {
        try {
            const result = await prisma.$transaction(async (prisma) => {
                const questsWithQuestionCount = await prisma.quest.findMany({
                    select: {
                        id: true,
                        title: true,
                        _count: {
                            select: { questions: true },
                        },
                    },
                });

                return questsWithQuestionCount;
            });

            return result;
        } catch (error) {
            console.error('Error counting questions per quest:', error);
            throw new Error('Error counting questions per quest');
        }
    }

    async countQuestionsPerQuestRaw() {
        return await prisma.$queryRaw<{ quest_id: number; title: string; question_count: number }[]>`
        SELECT q.id as quest_id, q.title, COUNT(qu.id)::int as question_count 
        FROM "Quest" q
        LEFT JOIN "Question" qu ON q.id = qu."questId"
        GROUP BY q.id, q.title;
    `;
    }

    // async softDeleteQuestion(questionId: number) {
    //     return await prisma.question.update({
    //         where: { id: questionId },
    //         data: { deletedAt: new Date() }
    //     });
    // }

}

export const questService = new QuestService();
