'use strict';

var express = require('express');
var controller = require('./usuarios.controller');

var router = express.Router();

router.post('/', controller.salvarUsuario);
router.get('/', controller.trazUsuarios);
router.get('/:cod', controller.trazUsuario);

module.exports = router;