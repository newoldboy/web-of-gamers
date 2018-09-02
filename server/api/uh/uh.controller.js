'use strict';

var _ = require('lodash'),
    Sync = require('./uh.model');

exports.salvarGrupoUH = function (req, res) {
    Sync.salvarGrupo(req.body,function (result, err) {

        if (err) {
            return handleError(res, err);
        }

        return res.status(200).json(result);
    });
};

exports.buscaGrupos = function (req, res) {
    Sync.buscaGrupos(function (result, err) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(result);
    });
};

exports.buscaGrupo = function (req, res) {
    Sync.buscaGrupo(req.params.cod, function (result, err) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(result);
    });
};

exports.editarGrupo = function (req, res) {
    Sync.editarGrupo(req.body, function (result, err) {

        if (err) {
            return handleError(res, err);
        }

        return res.status(200).json(result);
    });
};

function handleError(res, err) {
    return res.status(500).write('err');
}