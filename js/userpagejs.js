
/* global variables */

/* user page tab content*/
function userpagetab(evt, name){
	var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("optiondetails");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("userpagetabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

function checkdb(){
    var url = "http://localhost:8080/checkdb";
    $.get(url, function(dbstatus){
        if(dbstatus == "failure"){
            alert("database is not connected. Please refresh");
        }
    });
}

function sendrequest(){
    var url = "http://localhost:8080/sendrequest";
    var arr = {};
    var i, query;
    if(document.getElementById("accident").style.display == "block"){
        query = "accident";
        var radioaccident = document.getElementsByName("avehicletype");
        for(i=0; i<radioaccident.length-1; i++){
            if(radioaccident[i].checked == true )
                break;
        }
        arr = {
            query : "accident",
            accidentlocation : document.getElementsByName("accidentlocation")[0].value, 
            accidentinjured : document.getElementsByName("accidentinjured")[0].value,
            accidenttime : document.getElementsByName("accidenttime")[0].value,
            avehicletype : document.getElementsByName("avehicletype")[i].value
        };
    }
    else if(document.getElementById("snatch").style.display == "block"){
        query = "snatch";
        var i1,i2;
        var radiosnatch = document.getElementsByName("snatchinjured");
        for(i1=0; i1<radiosnatch.length-1; i1++){
            if(radiosnatch[i1].checked == true )
                break;
        }
        radiosnatch = document.getElementsByName("svehicletype");
        for(i2=0; i2<radiosnatch.length-1; i2++){
            if(radiosnatch[i2].checked == true )
                break;
        }
        arr = {
            query : "snatch",
            snatchlocation : document.getElementsByName("snatchlocation")[0].value,
            snatchinjured : document.getElementsByName("snatchinjured")[i1].value,
            snatcherno : document.getElementsByName("snatcherno")[0].value,
            svehicletype : document.getElementsByName("svehicletype")[i2].value
        }
    }
    else if(document.getElementById("traffic").style.display == "block"){
        query = "traffic";
        var radiotraffic = document.getElementsByName("signal");
        for(i=0; i<radiotraffic.length-1; i++){
            if(radiotraffic[i].checked == true )
                break;
        }
        arr = {
            query : "traffic",
            trafficlocation : document.getElementsByName("trafficlocation")[0].value,
            traffictime : document.getElementsByName("traffictime")[0].value,
            signal : document.getElementsByName("signal")[i].value
        }
    }

        $.post(url, JSON.stringify(arr) , function (data) {
            alert(data);
        });

}

