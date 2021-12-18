// import models
const User = require('./User');
const Challenge = require('./Challenge');
const Accepted = require('./Accepted');
const Completed = require('./Completed')

User.hasMany(Challenge, {
    foreignKey: "user_id",
});

User.hasMany(Accepted, {
    foreignKey: "user_id",
});

User.hasMany(Completed, {
    foreignKey: "user_id",
});

Challenge.belongsTo(User, {
    foreignKey: "user_id",
});

Challenge.hasMany(Accepted, {
    foreignKey: "challenge_id",
})

Challenge.hasMany(Completed, {
    foreignKey: "challenge_id",
})


Accepted.belongsTo(Challenge, {
    foreignKey: "challenge_id",
});

Accepted.hasMany(Completed, {
    foreignKey: "accepted_id"
})

Completed.belongsTo(Accepted, {
    foreignKey: "accepted_id",
});




module.exports = { User, Challenge, Accepted, Completed };
