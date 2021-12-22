const router = require('express').Router();
const authorize = require('../../utils/authorize');
const { User, Challenge } = require('../../models/index');

router.post('/', authorize, async (req, res) => {
  try {
    const challengeData = await Challenge.create({
      name: req.body.name,
      score: req.body.score,
      user_id: req.session.user_id,
    });

    if (!challengeData) {
      res.status(400).json({ Message: 'Could not create challenge' });
      return;
    }

    res.status(200).send(challengeData);
  } catch (err) {
    res
      .status(500)
      .json({ Message: 'Internal Server Error Please try again later' });
    return;
  }
});

router.put('/', authorize, async (req, res) => {
  try {
    const challengeData = await Challenge.update(req.body);

    if (!challengeData) {
      res.status(400).json({ Message: 'Could not update challenge' });
      return;
    }

    res.status(200).send(challengeData);
  } catch (error) {
    res
      .status(500)
      .json({ Message: 'Internal Server Error Please try again later' });
    return;
  }
});

router.delete('/delete/:id', authorize, async (req, res) => {
  try {
    const challengeData = await Challenge.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (challengeData > 0) {
      res.status(200).send('successfully deleted');
      return;
    }
  } catch (error) {
    res
      .status(500)
      .json({ Message: 'Internal Server Error Please try again later' });
    return;
  }
});

module.exports = router;
