const express = require('express');
const router = express.Router();
const { evalLanguages } = require('../components/statistics.js');

router.get('/languages/:user', async (req, res) => {
  try {
    const username = req.params.user;
    const languages = await evalLanguages(username);
    res.status(200).json(languages);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

module.exports = router;
