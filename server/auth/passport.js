'use strict';

const jwt = require('jwt-simple');
const utils = require("../utils");
const pool = require('../config/db');


function auth(usuario, senha, cb) {
    pool.get(function (err, db) {
        if (err) {
            db.detach();
            return cb(err, null);
        }            db.query("select CODIGO, USUARIO, SENHA, GRUPO_USUARIO, from GAME_USUARIO WHERE LOGIN = ? AND SENHA = ?", [usuario, senha], function (err, retUsers) {
            if (retUsers) {
                if (retUsers.length > 0) {
                    retUsers.forEach(function (row) {
                        row.NOME = (row.NOME !== null) ? utils.buffToStr(row.NOME) : row.NOME;
                        row.USUARIO = (row.USUARIO !== null) ? utils.buffToStr(row.USUARIO) : row.USUARIO;
                        row.SENHA = (row.SENHA !== null) ? utils.buffToStr(row.SENHA) : row.SENHA;
                    });
                    db.detach();
                    return cb(err, retUsers);
                }
            }
            db.detach();
            return cb('Usuário não encontrado', null);
        });
    });
    pool.destroy();
}

exports.autenticacao = function (req, res) {
    auth(req.body.usuario, req.body.senha, function (err, user) {
        if (user) {            
            if (user.length) {
                var encode = jwt.encode({
                    'usuario': user[0].USUARIO,
                    'senha': user[0].SENHA
                }, require('../config/environment').secrets.session); 

                return res.status(200).json({
                    codigo: user[0].CODIGO,
                    nome: user[0].NOME,
                    usuario: user[0].USUARIO,
                    grupo_usuario: user[0].GRUPO_USUARIO,
                    token: encode
                });
            }
        } else {
            console.log(err);
            return res.status(500).json(err)
        }
    });
};

exports.getToken = function (req, res) {
    var token = undefined;
    if (req.body['authorization']) {
        token = jwt.decode(req.body['authorization'], require('../config/environment').secrets.session);
    }
    console.log(token);
    res.status(200).json({
        status: true,
        decoded: token
    });
};