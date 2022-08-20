// Resources
var sqlite3 = require('sqlite3').verbose();
var validation = require(`${__dirname}/validation.js`);

var db = new sqlite3.Database('./data/main.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, validation.errorHandler);
// db.exec("DROP TABLE IF EXISTS users", errorHandler);

module.exports = db;