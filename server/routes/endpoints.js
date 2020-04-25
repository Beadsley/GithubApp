const express = require('express');
const router = express.Router();
const { getLanguageStatistics } = require('../controllers/statisticsController.js');

router.get('/languages/:user', getLanguageStatistics);

module.exports = router;
