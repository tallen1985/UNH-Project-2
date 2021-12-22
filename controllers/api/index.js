const router = require('express').Router();
const userRoutes = require('./userRoutes');
const challengeRoutes = require('./challengeRoutes');
const acceptedRoutes = require('./acceptedRoutes');
const completedRoutes = require('./completedRoutes');

router.use('/user', userRoutes);
router.use('/challenge', challengeRoutes);
router.use('/accepted', acceptedRoutes);
router.use('/completed', completedRoutes);

module.exports = router;
