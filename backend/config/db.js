const mysql = require('mysql2');
 
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '@Yasmin0303',
    database : 'myblog'
});

module.exports = db;