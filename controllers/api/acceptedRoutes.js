const router = require('express').Router();
const authorize = require('../../utils/authorize');
const { Accepted } = require('../../models/index');

router.get('/', async (req, res) => {
  const acceptedData = await Accepted.findAll();

  if (!acceptedData) {
    res.status(400).json({ Message: 'No Accepted Challenges Found' });
    return;
  }

  res.status(200).send(acceptedData);
});

router.put('/completed', authorize, async (req, res) => {
  try {
    const acceptedData = await Accepted.update(
      { completed: true },
      {
        where: {
          id: req.body.accepted_id,
        },
      }
    );

    if (!acceptedData) {
      res.status(400).json({ Message: 'Accepted challenge couldnt update' });
      return;
    }
    
    res.status(200).send(acceptedData);
  } catch (error) {
    res
      .status(500)
      .json({ Message: 'Internal Server Error Please try again later' });
    return;
  }
});

router.post('/', authorize, async (req, res) => {
  try {
    const acceptedData = await Accepted.create({
      user_id: req.session.user_id,
      challenge_id: req.body.challenge_id,
      // expiresAt: req.body.expiresAt,
    });

    if (!acceptedData) {
      res.status(400).json({ Message: 'Could not create accepted Challenge' });
      return;
    }

    res.status(200).send(acceptedData);
  } catch (error) {
    res
      .status(500)
      .json({ Message: 'Internal Server Error Please try again later' });
    return;
  }
});

router.put('/', authorize, async (req, res) => {
  try {
    const acceptedData = await Accepted.update(req.body);

    if (!acceptedData) {
      res.status(400).json({ Message: 'Could not update accepted Challenge' });
      return;
    }

    res.status(200).send(acceptedData);
  } catch (error) {
    res
      .status(500)
      .json({ Message: 'Internal Server Error Please try again later' });
    return;
  }
});

router.delete('/delete/:id', authorize, async (req, res) => {
  try {
    const acceptedData = await Accepted.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (acceptedData > 0) {
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
