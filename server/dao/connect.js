var mysql = require('mysql');
var config = require('../conf/db').mysql;

// 创建数据库连接池
var pool = mysql.createPool(config);
module.exports = pool;