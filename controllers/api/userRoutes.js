const router = require('express').Router();
const authorize = require('../../utils/authorize');
const { User, Challenge } = require('../../models/index');
const cloudinary = require('cloudinary').v2;

router.get('/', async (req, res) => {
  const userData = await User.findAll({
    include: [{ model: Challenge }],
  });

  if (!userData) {
    res.status(400).json({ Message: 'No Users Found' });
    return;
  }

  res.status(200).send(userData);
});

router.post('/signup', async (req, res) => {
  try {
    const checkforUser = await User.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (checkforUser) {
      res.status(400).json({ Message: 'User already Exists' });
      return;
    }

    const userData = await User.create(req.body);

    if (!userData) {
      res.status(400).json({ Message: 'Error adding user' });
    }

    req.session.save(() => {
      req.session.user_name = userData.dataValues.name;
      req.session.logged_in = true;
      req.session.user_id = userData.dataValues.id;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: 'Internal Server Error Please try again later' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (!userData) {
      res.status(400).json({ Message: 'Login Failed' });
      res.end();
      return;
    }

    const validated = await userData.checkPassword(req.body.password);

    if (validated) {
      req.session.save(() => {
        req.session.user_name = userData.dataValues.name;
        req.session.logged_in = true;
        req.session.user_id = userData.dataValues.id;
        res.status(200).json({ message: 'You are now logged in!' });
        res.end();
        return;
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ Message: 'Internal Server Error Please try again later' });
    res.end();
  }
});

router.put('/addScore', async (req, res) => {
  
  const scoreData = await User.increment(
    { score: +req.body.score },
    {
      where: {
        id: req.session.user_id,
      },
    }
  );

  if (!scoreData[0][1]) {
    res.status(400).json({ Message: 'User score couldnt update' });
    return;
  }
  
  res.status(200).send(scoreData);
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// image upload API
router.post('/image-upload', async (req, res) => {
  const updateData = await User.update(
    { image: JSON.stringify(req.body.url) },
    {
      where: {
        id: req.session.user_id,
      },
    }
  );
  if (updateData > 0) {
    res.status(200).json({ message: 'Added image Successfully' });
  } else {
    res.status(400).json({ message: 'Transfer failed' });
  }
});

module.exports = router;
