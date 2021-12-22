const router = require('express').Router();
const userRoutes = require('./userRoutes');
const challengeRoutes = require('./challengeRoutes');

router.use('/user', userRoutes);
router.use('/challenge', challengeRoutes);

module.exports = router;