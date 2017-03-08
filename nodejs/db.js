var mysql = require('mysql');
var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'spreadreach'
    });
var sql = 'select * from admindetails;';

connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result[0].nodeid);
});