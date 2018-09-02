'use strict';

var _ = require('lodash'),
Firebird = require('node-firebird'),
moment = require('moment'),
utf8 = require("utf8"),
config = require('../../config/environment'),
utils = require('../../utils'),
async = require('async'),
firebirdConfig = config.firebird,
pool = require('../../config/db'),
ftp = require('ftp');

exports.salvar = function (body, cb) {    
    console.log(body);
    return;
    
    pool.get(function (err, db) {
        if (err)
        throw err;        
        var data_cadastro = "'" + moment(body.data_cadastro).format('YYYY-MM-DD') + "'";
        var hora_cadastro = "'" + moment(body.hora_cadastro).format('HH:mm:ss') + "'";        
        db.execute("select RESULT from SET_USER_CDE_WIN('1', 'HOTEL_WEB', ?, ?, '1.0')", [1, 1], function (err, result) {
            if (result) {
                db.execute("select GEN_ID(GEN_TRANSACOES0, 1) as NUMERO from RDB$DATABASE", function (err, resultTransacao) {                    
                    db.query("INSERT INTO CAD_USUARIOS (USU_INC,NOME,ATIVO,LOGIN,SENHA,ID_TRANSACAO,GRUPO, DATA_INC, HORA_INC) VALUES ('1',?,?,?,?,?,?,?,?) RETURNING CODIGO ", [body.nome, body.ativo, body.login, body.senha, resultTransacao, body.grupo, data_cadastro, hora_cadastro], function (err, result) {
                        
                        console.log(err, result);
                        
                        db.detach();
                        cb(result);
                    });
                });
            } else {
                pool.destroy();
            }
        });
    });
};

exports.trazUsuarios = function (cb) {
    pool.get(function (err, db) {
        if (err)
        throw err;
        
        db.query("SELECT U.CODIGO, U.LOGIN,U.SENHA,U.NOME,UG.NOME AS GRUPO,U.ATIVO FROM CAD_USUARIOS U LEFT JOIN CAD_GRUPOS_USUARIOS UG ON UG.CODIGO = U.GRUPO ORDER BY U.CODIGO" , function (err, result) {
            if (result) {
                if (result.length > 0) {
                    result.forEach(function (row) {
                        row.NOME = (row.NOME !== null) ? buffToStr(row.NOME) : row.NOME;
                        row.LOGIN = (row.LOGIN !== null) ? buffToStr(row.LOGIN) : row.LOGIN;
                        row.ATIVO = (row.ATIVO !== null) ? buffToStr(row.ATIVO) : row.ATIVO;
                        row.SENHA = (row.SENHA !== null) ? buffToStr(row.SENHA) : row.SENHA;
                        row.GRUPO = (row.GRUPO !== null) ? buffToStr(row.GRUPO) : row.GRUPO;
                    });
                    db.detach();
                    cb(result);
                }
            } else {
                pool.destroy();
            }
        });
    });
}

exports.trazUsuario = function (cod,cb) { 
    pool.get(function(err, db) {
        if (err)
        throw err;
        db.query("SELECT U.CODIGO, U.LOGIN,U.SENHA,U.NOME,U.GRUPO AS COD_GRUPO,UG.NOME AS GRUPO,U.ATIVO FROM CAD_USUARIOS U LEFT JOIN CAD_GRUPOS_USUARIOS UG ON UG.CODIGO = U.GRUPO WHERE U.CODIGO = ? ORDER BY U.CODIGO",[cod],function(err, result) {
            if (err) {
                return db.detach(function(errDisconect) {
                    if (errDisconect) { 
                        console.log(errDisconect);
                    }
                    return cb(false, err);
                });
            }
            if (result.length) {
                result.forEach(function(row) {                           
                    row.NOME = (row.NOME !== null) ? buffToStr(row.NOME) : row.NOME;
                    row.LOGIN = (row.LOGIN !== null) ? buffToStr(row.LOGIN) : row.LOGIN;
                    row.ATIVO = (row.ATIVO !== null) ? buffToStr(row.ATIVO) : row.ATIVO;
                    row.SENHA = (row.SENHA !== null) ? buffToStr(row.SENHA) : row.SENHA;
                    row.GRUPO = (row.GRUPO !== null) ? buffToStr(row.GRUPO) : row.GRUPO;
                });
            }
            return cb(result);
        });
    });
    pool.destroy(); 
};

function buffToStr (buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
};