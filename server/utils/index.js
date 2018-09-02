'use strict';

const _ = require('lodash');

exports.handleError = (res, err) => {
    return res.status(500).send(err);
}

_.groupByMulti = (obj, values, context) => {
    if (!values.length)
        return obj;
    var byFirst = _.groupBy(obj, values[0], context),
        rest = values.slice(1);
    for (var prop in byFirst) {
        byFirst[prop] = _.groupByMulti(byFirst[prop], rest, context);
    }
    return byFirst;
};

exports.validaCaracteres = (strToReplace) => {
    var strSChar = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
    var strNoSChars = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
    var newStr = "";
    if (strToReplace) {
        for (var i = 0; i < strToReplace.length; i++) {
            if (strSChar.indexOf(strToReplace.charAt(i)) !== -1) {
                newStr += strNoSChars.substr(strSChar.search(strToReplace.substr(i, 1)), 1);
            } else {
                newStr += strToReplace.substr(i, 1);
            }
        }
    }
    return newStr.replace(/[^a-zA-Z 0-9]/g, '').toUpperCase();
}

exports.keysToLowerCase = (obj) => {
    var ret = {};
    var keys = Object.keys(Object(obj));

    for (var i = 0; i < keys.length; i++) {
        ret[keys[i].toLowerCase()] = obj[keys[i]];
    }
    return ret;
}

exports.generatePassword = (leng) => {

    var source = new Array("abcdefghijkmnopqrstuvwxyz", "ABCDEFGHJKLMNPQRSTUVWXYZ", "0123456789");
    var tamanho = leng || 10;
    var pw = '';
    for (var i = 0; i < tamanho; i++) {
        var st = Math.floor(Math.random() * source.length);
        var randomString = source[st];
        var ch = Math.floor(Math.random() * randomString.length);
        pw += randomString.charAt(ch);
        var z = randomString.split("");
        source[st] = z.join("")
    }
    return pw;
}

exports.buffToStr = (buf) => {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}