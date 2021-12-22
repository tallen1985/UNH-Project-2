const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Challenge extends Model {}

Challenge.init( /// make challenges on delete cascade. so that users who accepted the challenge and completed the challenge lost the challenge 
    {
       id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
       },
       name: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       user_id: {
           type: DataTypes.INTEGER,
           allowNull: true,
           references: {
            model: "user",
            key: "id",
          },
       },
       score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      category: {
          type: DataTypes.STRING,
          allowNull: false,
      }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'challenge',
    }
);

module.exports = Challenge;
