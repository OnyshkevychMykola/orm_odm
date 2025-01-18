import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/postgres';

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export { User };

import { Quest } from './Quest';

User.belongsToMany(Quest, { through: 'UserQuests' });
Quest.belongsToMany(User, { through: 'UserQuests' });
