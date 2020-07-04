const express = require('express');
const router = express.Router();
const { getClientBuild } = require('../controllers/statisticsController.js');

process.env.NODE_ENV === 'production' && router.get('*', getClientBuild);

module.exports = router;
