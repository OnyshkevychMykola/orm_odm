import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/postgres';

class Quest extends Model {}

Quest.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Quest',
    }
);

export { Quest };

import { Question } from './Question';

Quest.hasMany(Question);
Question.belongsTo(Quest);
