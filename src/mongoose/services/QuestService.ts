const { Quest } = require('../mongoose.schema');

class QuestService {
    async createQuest(title, description) {
        try {
            const quest = new Quest({ title, description });
            await quest.save();
            return quest;
        } catch (error) {
            console.error('Error creating quest:', error);
            throw new Error('Error creating quest');
        }
    }

    async getAllQuests() {
        try {
            return await Quest.find();
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw new Error('Error fetching quests');
        }
    }

    async getQuestById(id) {
        try {
            const quest = await Quest.findById(id);
            if (!quest) throw new Error('Quest not found');
            return quest;
        } catch (error) {
            console.error('Error fetching quest by ID:', error);
            throw new Error('Error fetching quest by ID');
        }
    }

    async updateQuest(id, title, description) {
        try {
            const quest = await Quest.findByIdAndUpdate(id, { title, description }, { new: true });
            if (!quest) throw new Error('Quest not found');
            return quest;
        } catch (error) {
            console.error('Error updating quest:', error);
            throw new Error('Error updating quest');
        }
    }

    async deleteQuest(id) {
        try {
            const quest = await Quest.findByIdAndDelete(id);
            if (!quest) throw new Error('Quest not found');
            return { message: 'Quest deleted successfully' };
        } catch (error) {
            console.error('Error deleting quest:', error);
            throw new Error('Error deleting quest');
        }
    }
}

module.exports = new QuestService();
