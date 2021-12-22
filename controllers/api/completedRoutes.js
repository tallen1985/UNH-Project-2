const router = require('express').Router();
const authorize = require('../../utils/authorize');
const { Completed, Accepted } = require('../../models/index');

router.post('/', authorize, async (req, res) => {
  try {
    const completedData = await Completed.create({
      user_id: req.session.user_id,
      challenge_id: req.body.challenge_id,
      accepted_id: req.body.accepted_id,
    });

    if (!completedData) {
      res.status(400).json({ Message: 'Could not complete Challenge' });
      return;
    }

    res.status(200).send(completedData);
  } catch (error) {
    res
      .status(500)
      .json({ Message: 'Internal Server Error Please try again later' });
    return;
  }
});

router.put('/', authorize, async (req, res) => {
  try {
    const completedData = await Completed.update(req.body);

    if (!completedData) {
      res.status(400).json({ Message: 'Could not update completed Challenge' });
      return;
    }

    res.status(200).send(completedData);
  } catch (error) {
    res
      .status(500)
      .json({ Message: 'Internal Server Error Please try again later' });
    return;
  }
});

router.delete('/delete/:id', authorize, async (req, res) => {
  try {
    const completedData = await Completed.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (completedData > 0) {
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
