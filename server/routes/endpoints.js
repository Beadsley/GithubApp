const express = require('express');
const router = express.Router();
const { getLanguageStatistics, getClientBuild } = require('../controllers/statisticsController.js');

router.get('/languages/:user', getLanguageStatistics);
process.env.NODE_ENV === 'production' && router.get('*', getClientBuild);

module.exports = router;
