const { Model, DataTypes } = require('sequelize');
const { databaseVersion } = require('../../../../unh-por-virt-fsf-pt-09-2021-u-c/13-ORM/01-Activities/23-Ins_One-to-Many/config/connection');
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
