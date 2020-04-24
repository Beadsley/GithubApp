const express = require('express');
const router = express.Router();
const { evalLanguages } = require('../components/statistics.js');

router.get('/languages/:user', async (req, res) => {
  try {
    const username = req.params.user;
    const languages = await evalLanguages(username);
    res.status(200).json(languages);
  } catch (err) {
    res.status(err.response.status).send({
      message: err.message,
      status: err.response.status,
    });
  }
});

module.exports = router;
