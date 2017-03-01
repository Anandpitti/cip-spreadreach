var url = require("url");
var http = require("http");
var mysql = require('mysql');
var wifi = require('node-wifi');
var port = process.argv[2];
//var port = 5555;
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    global.$ = require("jquery")(window);
});

global.nid=process.argv[3];
global.nodecenter=hospital;
global.queryno = 0;

http.createServer(function(req,res){
    if(req.url == "/adminlogin"){
        adminlogin(req, res);
    }
    else if(req.url == "/checkdb"){
        checkdb(req, res);
    }
    else if(req.url == "/adminregister"){
        adminregister(req, res);
    }
    else if(req.url == "/admindetails"){
        admindetails(req, res);
    }
    else if(req.url == "/adminstatus"){
        adminstatus(req, res);
    }
    else if(req.url == "/adminrqueries"){
        adminrqueries(req, res);
    }
    else if(req.url == "/adminping"){
        adminping(req, res);
    }
    else if(req.url == "/adminupdate"){
        adminupdate(req, res);
    }
    else if(req.url == "/admincontact"){
        admincontact(req, res);
    }
    else if(req.url == "/adminactivate"){
        adminactivate(req,res);
    }
    else if(req.url == "/getpath"){
        getpath(req, res);
    }
    else if(req.url == "/receivefile"){
        receivefile(req, res);
    }
    else if(req.url == "/clearquery"){
        clearquery(req, res);
    }
}).listen(port);//, "192.168.0.105");

function checkdb(req, res) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'spreadreach'
    });
    res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin' : '*'});
    connection.connect(function(err){
        if(!err){
            //console.log("db");
            connection.end(function(){});
        } else {
            res.write("failure");
            res.end();
            connection.end(function(){});
        }
    });
}

function adminlogin(req,res){
    if(req.method == "POST") {
        var body = '';
        req.on('data', function (data) {
            body =JSON.parse(data);
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'spreadreach'
            });
            var sql = 'select * from admindetails where nodeid = "' + body.lnodeid +'";';
            connection.query(sql, function (err, result) {
                if (err) throw err;
                if (result != "") {
                    if(body.lpassword == result[0].password) {
                        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
                        res.end("success");
                        nid = body.lnodeid;
                        getconnections(body.lnodeid);
                        connection.end(function () {
                        });
                    }
                    else {
                        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
                        res.end("failure");
                        connection.end(function () {
                        });
                    }
                }
                else {
                    res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
                    res.end("failure");
                    connection.end(function () {
                    });
                }
            });
        });
    }
    else {
        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
        res.end("send the details properly, this is not post method");
    }
}

function adminregister(req,res){
    if(req.method == "POST") {
        var body = '';
        req.on('data', function (data) {
            body =JSON.parse(data);
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'spreadreach'
            });
            var sql = 'insert into admindetails values("'+ body.rnodeid +'","'+ body.rpassword +'","'+ body.organisationname +'","'+ body.organisationtype +'","'+ body.location +'","'+ body.status +'");';
            connection.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
                    res.end("failure");
                    throw err;
                }
                else {
                    res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
                    res.end("success");
                    createadmindb(body.rnodeid);
                }
            });
        });
    }
    else {
        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
        res.end("send the details properly, this is not post method");
    }
}

function createadmindb(nodeid){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'spreadreach'
    });
    sql = 'CREATE TABLE queries'+ nodeid +' (`queryno` varchar( 20 ),`query` varchar( 32 ),`alocation` varchar( 32 ),`anoinjured` varchar( 20 ),`atime` varchar( 32 ),`avehicle` varchar( 32 ),`slocation` varchar( 32 ),`sinjured` varchar( 20 ),`sno` varchar( 20 ),`svehicle` varchar( 32 ),`tlocation` varchar( 32 ),`ttime` varchar( 20 ),`tsignal` varchar( 20 ));';
    connection.query(sql, function (err) {
        if(err) throw err;
    });
    sql = 'CREATE TABLE connections'+ nodeid +' (`portno` VARCHAR( 4 ));';
    connection.query(sql, function (err) {
        if(err) throw err;
    });
}

//function to add the queries when reaching control nodes

function admindetails(req, res){
    if(req.method == "POST") {
        var body = '';
        req.on('data', function (data) {
            body = data;
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'spreadreach'
            });
            res.writeHead(200, {"Content-Type": 'application/json', 'Access-Control-Allow-Origin' : '*'});
            var sql = 'select * from admindetails where nodeid="'+ body +'";';
            connection.query(sql, function (err, result) {
                if (err) {
                    res.end("failed to retrive, try again");
                    throw err;
                }
                else {
                    res.end(JSON.stringify(result));
                }
            });
        });
    }
    else {
        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
        res.end("");
    }
}

function adminstatus(req, res){
    if(req.method == "POST") {
        var body = '';
        req.on('data', function (data) {
            body = data;
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'spreadreach'
            });
            res.writeHead(200, {"Content-Type": 'application/json', 'Access-Control-Allow-Origin' : '*'});
            var sql = 'select * from admindetails where nodeid="'+ body +'";';
            connection.query(sql, function (err, result) {
                if (err) {
                    res.end("failed to retrive, try again");
                    throw err;
                }
                else {
                    res.end(JSON.stringify(result));
                }
            });
        });
    }
    else {
        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
        res.end("");
    }
}

function adminactivate(req, res){
    if(req.method == "POST") {
        var body = '';
        req.on('data', function (data) {
            body = data;
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'spreadreach'
            });
            res.writeHead(200, {"Content-Type": 'text', 'Access-Control-Allow-Origin' : '*'});
            var sql = 'update admindetails set status="active" where nodeid="'+ body +'";';
            //console.log(sql);
            connection.query(sql, function (err, result) {
                if (err) {
                    res.end("failed to retrive, try again");
                    throw err;
                }
                else {
                    res.end("success");
                }
            });
        });
    }
    else {
        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
        res.end("");
    }
}

function getconnections(nodeid) {
    wifi.init({
        iface : null
    });
    wifi.scan(function (err, networks) {
        if(err){
        }
        else{
            //console.log(networks);
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : '',
                database : 'spreadreach'
            });
            for(var i=0; i<networks.length;){
                var id = networks[i].ssid.split('_');
                if(id[0] == "nap"){
                    var sql = 'insert into connections'+ nodeid +' values("'+ id[1] +'");';
                    connection.query(sql, function (err) {
                        if(err) throw err;
                        connection.end(function(){});
                    });
                }
                i++;
            }
        }
    })
}

function adminping(req, res){
    if(req.method == "POST") {
        var body = '';
        req.on('data', function (data) {
            body = data;
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'spreadreach'
            });
            res.writeHead(200, {"Content-Type": 'application/json', 'Access-Control-Allow-Origin' : '*'});
            var sql = 'select * from connections'+ body +';';
            connection.query(sql, function (err, result) {
                if (err) {
                    res.end("failed to retrive, try again");
                }
                else {
                    res.end(JSON.stringify(result));
                }
            });
        });
    }
    else {
        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
        res.end("");
    }
}

function clearquery(req, res) {
    console.log("entering");
    var query;
    if(req.method == "POST") {
        var query = '';
        req.on('data', function (data) {
            query =JSON.parse(data);
            res.writeHead(200, {'Content-Type': 'text', 'Access-Control-Allow-Origin': '*'});
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : '',
                database : 'spreadreach'
            });
            var sql = 'delete from queries'+ query.nid +' where queryno="' + query.id + '";';
            connection.query(sql, function (err, routerdata) {
                if (err) throw err;
                res.end("success");
            });
        });
    }
    else{
        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
        res.end("send the details properly, this is not post method");
    }
}

function getpath(req, res) {
    var queryname;
    if(req.method == "POST") {
        var queryname = '';
        req.on('data', function (data) {
            queryname += data;
            res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : '',
                database : 'spreadreach'
            });
            var sql = 'select * from routertable'+ port +' where destination="' + queryname + '";';
            connection.query(sql, function (err, routerdata) {
                if (err) throw err;
                var data = JSON.stringify(routerdata);
                //console.log(routerdata.length);
                res.end(data);
            });
        });
    }
    else{
        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
        res.end("send the details properly, this is not post method");
    }
}

function receivefile(req, res) {
    if(req.method == "POST") {
        var body = '';
        req.on('data', function (data) {
            console.log("fileincoming");
            res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            res.end("1");
            body = JSON.parse(data);
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     : 'root',
                password : '',
                database : 'spreadreach'
            });
            if(body.query == "accident"){
                var sql = 'insert into queries'+ nid +' values("'+ queryno +'","'+ body.query +'","'+ body.accidentlocation +'","'+ body.accidentinjured +'","'+ body.accidenttime +'","'+ body.avehicletype +'","","","","","","","")';
                connection.query(sql,function(err, result){
                    queryno++;
                    if(err) throw err;
                });
            }
            else if(body.query == "snatch"){
                var sql = 'insert into queries'+ nid +' values("'+ queryno +'","'+ body.query +'","","","","","'+ body.snatchlocation +'","'+ body.snatchinjured +'","'+ body.snatcherno +'","'+ body.svehicletype +'","","","")';
                connection.query(sql,function(err, result){
                    queryno++;
                    if(err) throw err;
                });
            }
            else if(body.query == "traffic"){
                var sql = 'insert into queries'+ nid +' values("'+ queryno +'","'+ body.query +'","","","","","","","","","'+ body.trafficlocation +'","'+ body.traffictime +'","'+ body.signal +'")';
                connection.query(sql,function(err, result){
                    queryno++;
                    if(err) throw err;
                });
            }
        });
    }
    else {
        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
        res.end("send the details properly, this is not post method");
    }
}

function adminrqueries(req, res){
    if(req.method == "POST") {
        var body = '';
        req.on('data', function (data) {
            body = data;
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'spreadreach'
            });
            res.writeHead(200, {"Content-Type": 'application/json', 'Access-Control-Allow-Origin' : '*'});
            var sql = 'select * from queries'+ body +';';
            connection.query(sql, function (err, result) {
                if (err) {
                    res.end("failed to retrive, try again");
                    throw err;
                }
                else {
                    res.end(JSON.stringify(result));
                }
            });
        });
    }
    else {
        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
        res.end("");
    }
}

function adminupdate(req, res){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'spreadreach'
    });
    res.writeHead(200, {"Content-Type": 'application/json', 'Access-Control-Allow-Origin' : '*'});
    var sql = 'select * from connections'+ nodeid;
    connection.query(sql, function (err, result) {
                if (err) {
                    res.end("failed to retrive, try again");
                    throw err;
                }
                else {
                    res.end("success");
                    for(var i=0;i<result.length;i++){
                        var url='http://localhost:' + result[i].portno + '/updatepackage';
                        $post(url, nodecenter, function(data){
                        });
                    }
                }
            });
}

function admincontact(req, res){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'spreadreach'
    });
    res.writeHead(200, {"Content-Type": 'application/json', 'Access-Control-Allow-Origin' : '*'});
    var sql = 'select * from contacts';
    connection.query(sql, function (err, result) {
                if (err) {
                    res.end("failed to retrive, try again");
                    throw err;
                }
                else {
                    res.end(JSON.stringify(result));
                }
            });
}