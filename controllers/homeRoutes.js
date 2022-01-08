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

  const highscoreData = await User.findAll({
    order: [['score', 'DESC']],
    attributes: ['score', 'name'],
  });

  const challengePull = await Challenge.findAll({
    order: [['createdAt', 'DESC']],
    include: {
      model: User,
      attributes: ['name', 'image'],
    },
  });

  const acceptedPull = await Accepted.findAll({
    order: [['createdAt', 'DESC']],
    where: {
      user_id: req.session.user_id,
    },
    include: {
      model: Challenge,
    },
  });

  if (!userPull) {
    res.redirect('/login');
  }
  const data = userPull.dataValues;
  const challenge = challengePull.map((challenge) =>
    challenge.get({ plain: true })
  );

  const challengeByType = {
    physical: challenge.filter((c) => c.category == 'physical'),
    mental: challenge.filter((c) => c.category == 'mental'),
    other: challenge.filter((c) => c.category == 'other'),
  };
  const accepted = acceptedPull.map((accepted) =>
    accepted.get({ plain: true })
  );

  const completed = accepted.filter((challenge) => {
    if (challenge.completed) {
      return challenge;
    }
  });
  const numCompleted = completed.length;

  const userCreated = challenge.filter((c) => {
    return c.user_id === req.session.user_id;
  });
  const numCreated = userCreated.length;

  const highscore = highscoreData.map((score) => score.get({ plain: true }));
  res.render('index', {
    data,
    challenge,
    highscore,
    accepted,
    userCreated,
    numCreated,
    numCompleted,
    challengeByType,
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
  const acceptedPull = await Accepted.findAll({
    order: [['createdAt', 'DESC']],
    where: {
      user_id: req.session.user_id,
    },
    include: {
      model: Challenge,
    },
  });

  const accepted = acceptedPull.map((accepted) =>
    accepted.get({ plain: true })
  );

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
  const data = userPull.get({ plain: true });
  const challenge = challengePull.map((challenge) =>
    challenge.get({ plain: true })
  );
  const userCreated = challenge.filter((c) => {
    return c.user_id === req.session.user_id;
  });
  const numCreated = userCreated.length;

  res.render('dashboard', {
    accepted,
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
