import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../db/sequalize';

// @ts-ignore
class Quest extends Model {}

Quest.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 50],
            },
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

Quest.afterUpdate((quest, options) => {
    // @ts-ignore
    console.log(`Квест оновлено: ${quest.title}`);
});

Quest.hasMany(Question);
Question.belongsTo(Quest);
