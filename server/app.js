
'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development'; //development || production

const express = require('express');
const config = require('./config/environment');
const http = require('http');

const app = express();
const server = http.createServer(app);

require('./config/express')(app);
require('./routes')(app);

app.get('*', function (req, res) {
  res.redirect('/');
});

server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;