var url = require("url");
var http = require("http");
var mysql = require('mysql');
var wifi = require('node-wifi');
var port = '8080';
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    global.$ = require("jquery")(window);
});


var querylist = ["accident", "snatch", "traffic"];

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
            res.write("success");
        } else {
            res.write("failure");
        }
        res.end();
        connection.end(function(){});
    });
}

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

global.indextosend = 0;

function startprocess(packet){
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
        console.log(indextosend);
        var connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'spreadreach'
        });
        var sql = 'select portno from connections';
        connection.query(sql, function (err, ports) {
            if (err) throw err;
            console.log(ports);
            finishsendingone(packet, sendto);
        });
    }
    else{
        indextosend = 0;
    }
}

function finishsendingone(packet, sendto) {
    indextosend++;
    sendindividual(packet, sendto);
}


function searchandsend(packet) {

        (function (exports) {
            'use strict';

            var Sequence = exports.Sequence || require('sequence').Sequence
                , sequence = Sequence.create()
                , err
                ;

            sequence
                .then(function (next) {
                    setTimeout(function () {
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
                            next(err, packet, result);
                        });

                    }, 50);
                })
                .then(function (next, err, packet, sendto) {
                    setTimeout(function () {
                        var indextosend;
                        global.sendto1= sendto;
                        console.log(sendto.length);
                        for(indextosend=0; indextosend<sendto.length; indextosend++) {
                            var connection = mysql.createConnection({
                                host: '127.0.0.1',
                                user: 'root',
                                password: '',
                                database: 'spreadreach'
                            });
                            var sql = 'select portno from connections';
                            connection.query(sql, function (err, ports) {
                                if (err) throw err;
                                var i = 0;
                                next(err, ports,sendto1, i, indextosend-1, packet);
                            });
                        }
                    }, 100);
                })
                .then(function (next,err, ports,sendto1, i, indextosend, packet) {
                    setTimeout(function () {
                        //console.log(sendto1[indextosend]);
                        var localpath = [], totalpath = [];
                        global.totalpathindex = 0;
                        var url;
                        for (; i <= ports.length-1;) {
                            url = 'http://localhost:' + ports[i].portno + '/getpath';
                            $.post(url, sendto1[indextosend].sendto, function (localpath) {
                                console.log(JSON.stringify(localpath));
                                next(localpath,totalpath, packet);
                            });
                            i++;
                        }
                    }, 150);
                })
                .then(function (next, localpath,totalpath,packet) {
                    setTimeout(function () {
                        console.log(localpath);
                        for (var j = 0; j < localpath.length; ) {
                            totalpath[totalpathindex] = localpath[j];
                            totalpathindex++;
                            j++;
                        }
                        //console.log(totalpath);
                        next(err, totalpath,packet);
                    }, 550);
                })
                .then(function (next, err, totalpath, packet) {
                    //sorting here

                    next(err, totalpath,packet);
                })
                .then(function (next, err, totalpath,packet) {
                    setTimeout(function () {
                        for(var j=0; j<totalpathindex;) {
                            var flag;
                            var besturl = 'http://localhost:' + totalpath[j].port + '/receivefile';
                            $.post(besturl, JSON.stringify(packet) , function (data) {
                                flag = data;
                                console.log(data);
                            });
                            if(flag == "1") break;
                            j++;
                        }
                        next();
                    }, 750);
                });


        }('undefined' !== typeof exports && exports || new Function('return this')()));


}

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
            var sql = 'select * from routertable where destination="' + queryname + '";';
            connection.query(sql, function (err, routerdata) {
                if (err) throw err;
                var data = JSON.stringify(routerdata);
                console.log(routerdata.length);
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
            body = JSON.stringify(body);
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
                });
            });
        });
    }
    else {
        res.writeHead(200, {"Content-Type": "text", 'Access-Control-Allow-Origin': '*'});
        res.end("send the details properly, this is not post method");
    }
}