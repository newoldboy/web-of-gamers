'use strict';

var _ = require('lodash'),
Sync = require('./usuarios.model');

exports.salvarUsuario = function (req, res) {
    Sync.salvar(req.body, function (result, err) {
        
        if (err) {
            return handleError(res, err);
        }
        
        return res.status(200).json(result);
    });
};

exports.trazUsuarios = function (req, res){
    Sync.trazUsuarios(function (result, err){
        if (err){
            return handleError(res, err);
        }
        return res.status(200).json(result);
    });
};

exports.trazUsuario = function (req, res){
    Sync.trazUsuario(req.params.cod, function (result, err){
        if (err){
            return handleError(res, err);
        }
        return res.status(200).json(result);
    });
};
function handleError(res, err) {
    return res.status(500).write('err');
}