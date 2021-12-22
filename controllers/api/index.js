const router = require('express').Router();
const userRoutes = require('./userRoutes');
const challengeRoutes = require('./challengeRoutes');
const acceptedRoutes = require('./acceptedRoutes');

router.use('/user', userRoutes);
router.use('/challenge', challengeRoutes);
router.use('/accepted', acceptedRoutes);

module.exports = router;
