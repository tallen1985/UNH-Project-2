const sequelize = require('../config/connection');
const { User, Challenge, Accepted } = require('../models');

const userData = require('./userData.json');
const challengeData = require('./challengeData.json');
const acceptedData = require('./acceptedData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Challenge.bulkCreate(challengeData);

  await Accepted.bulkCreate(acceptedData)

  process.exit(0);
};

seedDatabase();
