const mysql = require('mysql2');

const environment = require('./environment');

const pool = mysql.createPool({ ...environment.db });

module.exports = pool.promise();
