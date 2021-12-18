const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Accepted extends Model {}

Accepted.init(
    {
       id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
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
       expiresAt: {
           type: DataTypes.TIME,
           allowNull: false,
       }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'accepted',
    }
);

module.exports = Accepted;
