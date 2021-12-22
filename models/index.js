// import models
const User = require('./User');
const Challenge = require('./Challenge');
const Accepted = require('./Accepted');

User.hasMany(Challenge, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

User.hasMany(Accepted, {
    foreignKey: "user_id",
});

Challenge.belongsTo(User, {
    foreignKey: "user_id",
});

Challenge.hasMany(Accepted, {
    foreignKey: "challenge_id",
});

Accepted.belongsTo(Challenge, {
    foreignKey: "challenge_id",
});





module.exports = { User, Challenge, Accepted };
