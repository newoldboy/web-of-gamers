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

exports.salvarGrupo = function (body, cb) {
    pool.get(function (err, db) {
        if (err)
            throw err;
        db.query("INSERT INTO HOT_CAD_GRUPO_UH (NOME) VALUES (?)", [body.nome], function (err, result) {
            if (err) {
                return db.detach(function (errDisconect) {
                    if (errDisconect) {
                        console.log(errDisconect);
                    }
                    return cb(false, err);
                });
            }
            return cb(result);
        });
    });
    pool.destroy();
}

exports.buscaGrupos = function (cb) {
    pool.get(function (err, db) {
        if (err)
            throw err;

        db.query("SELECT CODIGO, NOME FROM HOT_CAD_GRUPO_UH G ORDER BY G.CODIGO", function (err, result) {
            if (result) {
                if (result.length > 0) {
                    result.forEach(function (row) {
                        row.NOME = (row.NOME !== null) ? buffToStr(row.NOME) : row.NOME;
                    });
                    db.detach();
                    cb(result);
                }
            } else {
                pool.destroy();
            }
        });
    });
};

exports.buscaGrupo = function (cod, cb) {
    pool.get(function (err, db) {
        if (err)
            throw err;

        db.query("SELECT CODIGO, NOME FROM HOT_CAD_GRUPO_UH G WHERE G.CODIGO = ? ORDER BY G.CODIGO", [cod], function (err, result) {
            if (result) {
                if (result.length > 0) {
                    result.forEach(function (row) {
                        row.NOME = (row.NOME !== null) ? buffToStr(row.NOME) : row.NOME;
                    });
                    db.detach();
                    cb(result);
                }
            } else {
                pool.destroy();
            }
        });
    });
};

exports.editarGrupo = function (body, cb) {
    pool.get(function (err, db) {
        if (err)
            throw err;
        db.query("UPDATE HOT_CAD_GRUPO_UH SET NOME = ? WHERE CODIGO = ?", [body.nome, body.codigo], function (err, result) {
            if (err) {
                return db.detach(function (errDisconect) {
                    if (errDisconect) {
                        console.log(errDisconect);
                    }
                    return cb(false, err);
                });
            }
            return cb(result);
        });
    });
    pool.destroy();
}

function buffToStr(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
};