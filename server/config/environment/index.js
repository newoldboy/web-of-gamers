'use strict';

const path = require('path'); 
const _    = require('lodash');

// All configurations will extend these options
// ============================================
const all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 443,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    secrets: {
        session: 'angular-fullstack-secret'
    },
    firebird: {
        host: '192.168.200.45', 
        port: 3050,
        database: 'D:/PROGRAMAÇÃO/bases/PortalGame.fdb',
        user: 'SYSDBA',
        password: 'masterkey', //sdb162sw masterkey
        lowercase_keys: false,
        role: null,
        pageSize: 4096
    }
};
// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.extend(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {}
);