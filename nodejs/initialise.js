var mysql = require('mysql');

var port = process.argv[2];
global.nodeid = process.argv[3];
var sql = "";

function initialise() {
    var lookup = [{
        query : "", sendto : ""},{
        query : "", sendto : ""},{
        query : "", sendto : ""},{
        query : "", sendto : ""}];
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'spreadreach'
    });
    /*sql = 'CREATE TABLE lookup (`query` VARCHAR( 32 ), `sendto` VARCHAR( 32 ));';
    connection.query(sql, function (err) {
        if(err) throw err;
    });*/
    sql = 'CREATE TABLE connections'+ port +' (`portno` VARCHAR( 4 ));';
    connection.query(sql, function (err) {
        if(err) throw err;
    });
    sql = 'CREATE TABLE routertable'+ port +' (`nodeid` VARCHAR( 32 ), `destination` VARCHAR( 32 ), `distance` VARCHAR( 32 ), `port` VARCHAR( 4 ), `name` VARCHAR( 20 ));';
    connection.query(sql, function (err) {
        if(err) throw err;
    });
    /*for(var temp=0; temp<lookup.length; temp++){
        sql = 'insert into lookup values("'+ lookup[temp].query +'","'+ lookup[temp].sendto +'");';
        connection.query(sql, function (err) {
            if(err) throw err;
        });
    }*/
}
initialise();
