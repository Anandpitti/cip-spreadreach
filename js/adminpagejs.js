var nodeid="";
var port=5555;

function findnodeid(){
    var c = document.cookie;
    flag=0;
    var k=0;
    nodeid="";
    for(var i=0; i<c.length; i++){
        if(flag == 1){
            nodeid += c[i];
            k++;
        }
        if(c[i] == "="){
            flag=1;
        }
    }
}

function displaydetails(){
    findnodeid();
    var url = "http://localhost:"+ port +"/admindetails";
    $.post(url, nodeid , function (data) {
        var t = document.getElementById("admindetails");
    t.innerHTML = "<br><center><b>ADMIN DETAILS</center><br><br><form class=\"form\"><center>Nodeid :  "+ data[0].nodeid +"<br><br>Organisation Type :  "+ data[0].organisationtype +"<br>Organisation Name :  "+ data[0].organisationname +"<br>Location :  "+ data[0].organisationlocation +"<br></center></form></b>";
    });
}

function displaystatus(){
    findnodeid();
    var url = "http://localhost:"+ port +"/adminstatus";
    $.post(url, nodeid , function (data) {
        var t = document.getElementById("adminstatus");
    t.innerHTML = "<br><center><b>STATUS</center><br><br><form class=\"form\"><center>Nodeid :  "+ data[0].nodeid +"<br><br>Status :  "+ data[0].status +"<br></center></form></b>";
    if(data[0].status == "inactive"){
        t.innerHTML +="<center><div class=\"sendbutton\"><li style=\"height:50%; width:10%;\"><button onclick=\"activate()\">activate</button></li></div><center>"; 
    }
    });
}

function activate(){
    findnodeid();
    var url = "http://localhost:"+ port +"/adminactivate";
    $.post(url, nodeid , function (data) {
        if(data == "success"){
            alert("successfully activated");
            location.reload();
        }
        else{
            alert("there seems to be some problem, try again later");
        }
    });
}

function displayqueries(){
    findnodeid();
    var url = "http://localhost:"+ port +"/adminrqueries";
    $.post(url, nodeid , function (data) {
        var t = document.getElementById("adminrqueries");
        t.innerHTML = "<br><center><b>QUERIES</b></center><br><br>";
        for(var i=0; i<data.length; i++){
            if(data[i].query == "accident"){
                t.innerHTML += "<form class=\"form\"><b><center>querynumber: "+ data[i].queryno +"<br>query: "+ data[i].query +"<br>location: "+ data[i].alocation +"<br>number injured: "+ data[i].anoinjured +"<br>time: "+ data[i].atime +"<br>vehicle: "+ data[i].avehicle +"</center></b></form><br><center><div class=\"sendbutton\"><li style=\"height:50%; width:10%;\"><button onclick=\"clearquery("+ data[i].queryno +")\">clear</button></li></div><center>";
            }
            else if(data[i].query == "snatch"){
                t.innerHTML += "<form class=\"form\"><b><center>querynumber: "+ data[i].queryno +"<br>query: "+ data[i].query +"<br>location: "+ data[i].slocation +"<br>victim injured?: "+ data[i].sinjured +"<br>number of snatchers: "+ data[i].sno +"<br>vehicle used: "+ data[i].svehicle +"</center></b></form><br><center><div class=\"sendbutton\"><li style=\"height:50%; width:10%;\"><button onclick=\"clearquery(data[i].queryno)\">clear</button></li></div><center>";
            }
            else if(data[i].query == "traffic"){
                t.innerHTML += "<form class=\"form\"><b><center>querynumber: "+ data[i].queryno +"<br>query: "+ data[i].query +"<br>location: "+ data[i].tlocation +"<br>time waiting: "+ data[i].ttime +"<br>signal working?: "+ data[i].tsignal +"</center></b></form><br><center><div class=\"sendbutton\"><li style=\"height:50%; width:10%;\"><button onclick=\"clearquery(data[i].queryno)\">clear</button></li></div><center>";
            }
        }
        t.innerHTML += "";
    });
}

function clearquery(queryno){
    findnodeid();
    var url = "http://localhost:"+ port +"/clearquery";
    var arr = {
        nid : nodeid,
        id : queryno
    };
    $.post(url, JSON.stringify(arr) , function (data) {
        if(data == "success"){
            alert("the query successfully deleted");
            location.reload();
        }
        else{
            alert("something went wrong, try again");
        }
    });
}

function displayping(){
    findnodeid();
    var url = "http://localhost:"+ port +"/adminping";
    $.post(url, nodeid , function (data) {   
        var t = document.getElementById("adminping");
        t.innerHTML = "<br><center><b>DEVICES AROUND</b></center><br><br>"; 
        for(var i=0; i<data.length; i++){
            t.innerHTML += "<form class=\"form\"><b>"+ data[i].portno + "</b></form><br>";
        }
        t.innerHTML += "";
    });
}

function displayupdate(){
    var t = document.getElementById("adminupdate");
    var url = "http://localhost:"+ port +"/adminupdate";
    $.post(url, nodeid , function (data) {
        if(data == "success") alert("successfully updated to nearby nodes");
        else   alert("something went wrong. try again");
    });
    t.innerHTML += "";
}

function displaycontact(){
    var url = "http://localhost:"+ port +"/admincontact";
    $.post(url, "contact" , function (data) {   
        var t = document.getElementById("admincontact");
        t.innerHTML = "<br><center><b>CONTACT</b></center><br><br>"; 
        for(var i=0; i<data.length; i++){
            t.innerHTML += "<form class=\"form\"><b><center>"+ data[i].name + " - " + data[i].number + "</center></b></form><br>";
        }
        t.innerHTML += "";
    });
}
