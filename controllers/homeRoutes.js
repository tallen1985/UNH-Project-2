const router = require('express').Router();
const authorize = require('../utils/authorize');
const { User, Challenge, Accepted } = require('../models');

router.get('/', authorize, async (req, res, next) => {
  const userPull = await User.findOne({
    where: {
      id: req.session.user_id,
    },
    include: [{ model: Accepted }],
  });

  const challengePull = await Challenge.findAll({
    order: [['createdAt', 'DESC']],
    include: {
      model: User,
      attributes: ['name'],
    },
  });

  if (!userPull) {
    res.redirect('/login');
  }
  const data = userPull.dataValues;
  const challenge = challengePull.map((challenge) =>
    challenge.get({ plain: true })
  );
  const userCreated = challenge.filter((c) => {
    return c.user_id === req.session.user_id;
  });
  const numCreated = userCreated.length;

  res.render('index', {
    data,
    challenge,
    userCreated,
    numCreated,
    logged_in: req.session.logged_in,
    user_name: req.session.user_name,
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/dashboard', async (req, res) => {
  const userPull = await User.findOne({
    where: {
      id: req.session.user_id,
    },
    include: [{ model: Accepted }],
  });

  const challengePull = await Challenge.findAll({
    order: [['createdAt', 'DESC']],
    include: {
      model: User,
      attributes: ['name'],
    },
  });

  if (!userPull) {
    res.redirect('/login');
  }
  const data = userPull.dataValues;
  const challenge = challengePull.map((challenge) =>
    challenge.get({ plain: true })
  );
  const userCreated = challenge.filter((c) => {
    return c.user_id === req.session.user_id;
  });
  const numCreated = userCreated.length;

  res.render('dashboard', {
    data,
    challenge,
    userCreated,
    numCreated,
    logged_in: req.session.logged_in,
    user_name: req.session.user_name,
  });
});

router.post('/uplaod', (req, res) => {});
module.exports = router;
