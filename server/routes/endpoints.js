const express = require('express');
const router = express.Router();

router.get('/ping', async (req, res) => {
  try {
    res.status(200).json({ message: 'pong' });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
