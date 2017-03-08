var url = require("url");
var http = require("http");
var mysql = require('mysql');
var wifi = require('node-wifi');
var port = process.argv[2];
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    global.$ = require("jquery")(window);
});

//query list

var querylist = ["accident", "snatch", "traffic"];

//global declarations

global.indextosend = 0;
global.totalpathindex = 0;
global.bestpath = [];
global.localpath = [];
global.array = require('array');
global.collectindex = 0;
global.nodeid = process.argv[3];

//initialize the db for working

//server running

http.createServer(function(req,res){
    if(req.url == "/checkdb"){
        checkdb(req, res);
    }
    else if(req.url == "/sendrequest"){
        sendrequest(req, res);
    }
    else if(req.url == "/getpath"){
        getpath(req, res);
    }
    else if(req.url == "/receivefile"){
        receivefile(req, res);
    }
}).listen(port);//, "192.168.0.105");


function checkdb(req, res) {
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'spreadreach'
    });
    res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin' : '*'});
    connection.connect(function(err){
        if(!err){
            getconnections(res);
            connection.end(function(){});
        } else {
            res.write("failure");
            res.end();
            connection.end(function(){});
        }
    });
}

function getconnections(res) {
    wifi.init({
        iface : null
    });
    wifi.scan(function (err, networks) {
        if(err){
            res.write("failure");
        }
        else{
            console.log(networks);
            res.write("success");
            var connection = mysql.createConnection({
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'spreadreach'
            });
            for(var i=0; i<networks.length;){
                var id = networks[i].ssid.split('_');
                if(id[0] == "nap"){
                    var sql = 'insert into connections'+ port +' values("'+ id[1] +'");';
                    connection.query(sql, function (err) {
                        if(err) throw err;
                        res.end();
                        connection.end(function(){});
                    });
                }
                i++;
            }
        }
    })
}

/*this is for scanning name with the port in the name and localhost running different servers.
for different machines and different hotspots, first scan, then do a for loop by counter, in each segment,
connect to one hotspot and send request for default ip and port listening to get the original ip and port values.
so two files have to run in each system, one is the main js server and other for providing credidentials i.e, access of ip, port
*/

//sender part

function sendrequest(req, res){
    if(req.method == "POST") {
        var body = '';
        req.on('data', function (data) {
            body += data;
            var i = 0;
            res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
            for (i = 0; i < querylist.length; i++) {
                if (JSON.parse(body).query == querylist[i]) {
                    res.end("your request has been registered successfully.");
                    break;
                }
            }
            if (i >= querylist.length) {
                res.end("there seems to be something wrong, resend the request!");
            }
            else {
                var fsreq = require('fs');
                var filename = port + 'requestfile.txt';
                fsreq.open(filename, "w+", function (err, fd) {
                    if (err) throw err;
                    fsreq.writeFile(filename, body, function (err) {
                        if (err) {
                            throw err;
                        }
                        fsreq.close(fd, function (err) {
                            if (err) throw err;
                        });
                        startprocess(JSON.parse(body));
                    });
                });
            }
        });
    }
    else {
        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
        res.end("send the details properly, this is not post method");
    }
}

function startprocess(packet){
    console.log(packet);
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'spreadreach'
    });
    var sql = 'select sendto from lookuptable where query = "' + packet.query + '";';
    var result;
    connection.query(sql, function (err, result) {
        if(err) throw err;
        sendindividual(packet, result);
    });

}

function sendindividual(packet, sendto) {
    if(indextosend < sendto.length){
        //console.log("indextosend" + indextosend + "value: " + sendto[indextosend].sendto);
        var connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'spreadreach'
        });
        var sql = 'select portno from connections' + port + ';';
        connection.query(sql, function (err, ports) {
            if (err) throw err;
            //console.log("ports: " + ports);
            collectpaths(packet, sendto, ports);
        });
    }
    else{
        indextosend = 0;
    }
}

function collectpaths(packet, sendto, ports){
    if(collectindex < ports.length){
        //console.log("collectindex: " + collectindex);
        var url;
        url = 'http://localhost:' + ports[collectindex].portno + '/getpath';
        //console.log(url);
        $.post(url, sendto[indextosend].sendto, function (localpath) {
            //console.log(localpath.length);
            for (var j = 0; j < localpath.length; ) {
                //console.log(localpath[j]);
                if(bestpath == ""){
                    bestpath = localpath[j];
                    //console.log(bestpath.port);
                }
                else{
                    if(bestpath.distance > localpath[j].distance)
                        bestpath = localpath[j];
                    //console.log(bestpath.port);
                }
                j++;
            }
            //console.log("bestpath: " + bestpath);
            finishcollectingoneport(packet, sendto, ports);
        });
    }
    else{
        //console.log(JSON.stringify(bestpath));
        var dbupdate =bestpath;
        sendfile(packet, sendto, ports, dbupdate);
    }
}

function sendfile(packet, sendto, ports, dbupdate) {
    //console.log(JSON.stringify(bestpath));
    var flag;
    var besturl = 'http://localhost:' + bestpath.port + '/receivefile';
    //console.log(packet);
    $.post(besturl, JSON.stringify(packet) , function (data) {
        flag = data;
        //console.log(data);
        if(flag == "1"){
            //update db
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: '',
                database: 'spreadreach'
            });
            var sql = 'delete from routertable'+ port +' where destination="' + sendto[indextosend].sendto + '";';
            connection.query(sql, function (err) {
                if (err) throw err;
                var no = parseInt(dbupdate.distance);
                no++;
                sql = 'insert into routertable'+ port + ' values("'+ nodeid +'","'+ dbupdate.destination +'","'+ no +'","'+ port +'","'+ dbupdate.name +'");';
                connection.query(sql, function (err) {
                    if (err) throw err;
                });
            });
            collectindex = 0;
            bestpath = "";
            console.log("file successfully sent to " + besturl);
            finishsendingone(packet, sendto);
        }
        else {
            collectindex = 0;
            bestpath = "";
            console.log("file sending unsuccessfull to " + besturl);
            collectpaths(packet, sendto, ports);
        }
    });

}

function finishcollectingoneport(packet, sendto, ports) {
    //console.log(JSON.stringify(bestpath));
    collectindex++;
    collectpaths(packet, sendto, ports);
}

function finishsendingone(packet, sendto) {
    indextosend++;
    sendindividual(packet, sendto);
}

//receiver part

function getpath(req, res) {
    var queryname;
    if(req.method == "POST") {
        var queryname = '';
        req.on('data', function (data) {
            queryname += data;
            res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            var connection = mysql.createConnection({
                host     : '127.0.0.1',
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
            body += data;
            //body = JSON.stringify(body);
            var fsreq = require('fs');
            var filename = port + 'requestfile.txt';
            fsreq.open(filename, "w+", function (err, fd) {
                if (err) throw err;
                fsreq.writeFile(filename, body, function (err) {
                    if (err) {
                        throw err;
                    }
                    fsreq.close(fd, function (err) {
                        if (err) throw err;
                    });
                    startprocess(JSON.parse(body));
                });
            });
        });
    }
    else {
        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
        res.end("send the details properly, this is not post method");
    }
}
