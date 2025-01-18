import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/postgres';

class Question extends Model {}

Question.init(
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Question',
    }
);

export { Question };
