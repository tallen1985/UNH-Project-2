const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Challenge extends Model {}

Challenge.init(
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
           allowNull: false,
           references: {
            model: "user",
            key: "id",
          },
       },
       createdAt: {
           type: DataTypes.TIME,
           allowNull: false,
       },
       score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
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
