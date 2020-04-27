const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const routes = require('./server/routes/endpoints.js');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routes);
process.env.NODE_ENV === 'production' && app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(PORT, () => {
  console.log(`running om port: ${PORT}`);
});

module.exports.app = app;
