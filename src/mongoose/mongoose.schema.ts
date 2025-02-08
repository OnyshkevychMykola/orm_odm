const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    quests: [{ type: Schema.Types.ObjectId, ref: 'Quest' }],
});

const QuestionSchema = new Schema({
    text: { type: String, required: true },
    answer: { type: String, required: true },
    quest: { type: Schema.Types.ObjectId, ref: 'Quest', required: true },
});

const QuestSchema = new Schema({
    title: { type: String, required: true, maxlength: 50 },
    description: { type: String },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const User = model('User', UserSchema);
const Question = model('Question', QuestionSchema);
const Quest = model('Quest', QuestSchema);

module.exports = { User, Question, Quest };
