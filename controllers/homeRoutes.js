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
  // const acceptedPull = await Accepted.findAll({
  //   include: {
  //     model: User,
  //     attributes: ['user_id']
  //   }
  // })

  if (!userPull) {
    res.redirect('/login');
  }
  const data = userPull.dataValues;
  const challenge = challengePull.map((challenge) =>
    challenge.get({ plain: true })
  );
  // const accepted_count = acceptedPull.maps((accepted_count) => {
  //   accepted_count.get({ plain: true })
  // });

  res.render('index', {
    data,
    challenge,
    // accepted_count,
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

module.exports = router;
