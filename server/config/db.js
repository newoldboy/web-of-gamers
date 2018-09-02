/**
 * Express configuration
 */

'use strict';

const config = require('../config/environment');
const firebird = require('node-firebird');

module.exports = firebird.pool(30, config.firebird);