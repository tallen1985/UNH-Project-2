const { Model, DataTypes } = require('sequelize');
const { databaseVersion } = require('../../../../unh-por-virt-fsf-pt-09-2021-u-c/13-ORM/01-Activities/23-Ins_One-to-Many/config/connection');
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
           allowNull: true,
           references: {
            model: "user",
            key: "id",
        },
       },
       challenge_id: {
           type: DataTypes.INTEGER,
           allowNull: true,
           references: {
               model: "challenge",
               key: "id",
           },
       },
       completed: {
           type: DataTypes.BOOLEAN,
           defaultValue: false,
           allowNull: false,
       },
    //    expiresAt: {// perhaps use a function to assist with this
    //        type: DataTypes.TIME,
    //        allowNull: true,
    //    }
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
