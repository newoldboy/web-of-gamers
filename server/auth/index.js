'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./passport');

router.post('/', controller.autenticacao);

module.exports = router;