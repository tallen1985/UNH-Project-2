const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Completed extends Model {}

Completed.init(
    {   
        accepted_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "accepted",
                key: "id"
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
         },
        },
        challenge_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "challenge",
                key: "id",
            },
        },
        link_to_media: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'completed',
    }
);

module.exports = Completed;
