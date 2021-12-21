const router = require('express').Router();
const authorize = require('../utils/authorize');
const { User, Challenge } = require('../models');

router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        const userData = await User.findOne({
      where: {
          id: req.session.user_id
      }
    });
  

  if (!userData) {
    res.redirect('/login');
  }
  const data = [userData].map((user) => user.get({ plain: true }));

  res.render('home', {
    data,
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
