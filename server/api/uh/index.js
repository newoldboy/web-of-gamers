'use strict';

var express = require('express');
var controller = require('./uh.controller');

var router = express.Router();

router.post('/', controller.salvarGrupoUH);
router.get('/', controller.buscaGrupos);
router.get('/:cod', controller.buscaGrupo);
router.get('/:codigo', controller.editarGrupo);

module.exports = router;