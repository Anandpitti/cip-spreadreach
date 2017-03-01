var port=5555;

function adminlogintab(evt, name){
	var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("optiondetails");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("adminlogintabs");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

function checkdb(){
    var url = "http://localhost:"+ port +"/checkdb";
    $.get(url, function(dbstatus){
        if(dbstatus == "failure"){
            alert("database is not connected. Please refresh");
        }
    });
}

function adminlogin(){
    var url = "http://localhost:"+ port +"/adminlogin";
    var arr = {};
    var i;
    if(document.getElementById("adminlogin").style.display == "block"){
        arr = {
            lnodeid : document.getElementsByName("lnodeid")[0].value, 
            lpassword : document.getElementsByName("lpassword")[0].value
            };
        $.post(url, JSON.stringify(arr) , function (data) {
            if(data == "success"){
                document.cookie = "nodeid="+ arr.lnodeid +"; expires=Thu, 18 Dec 2020 12:00:00 UTC; path=/";
                window.open("http://localhost/spreadreach/adminpage.php","_self");
            }
            else if (data == "failure"){
                alert("the entered node id or password might be wrong");
            }
            else{
                alert("something went wrong, try again");
            }
        });
    }
}

function adminregister(){
    var url = "http://localhost:"+ port +"/adminregister";
    var arr = {};
    var i;
    if(document.getElementById("adminregister").style.display == "block"){
        arr = {
            organisationname : document.getElementsByName("organisationname")[0].value, 
            organisationtype : document.getElementsByName("organisationtype")[0].value,
            location : document.getElementsByName("location")[0].value,
            rnodeid : document.getElementsByName("rnodeid")[0].value, 
            rpassword : document.getElementsByName("rpassword")[0].value,
            status : "inactive"
        };
    }
    $.post(url, JSON.stringify(arr) , function (data) {
        if(data == "success"){
            alert("successfully registered");
            window.open("http://localhost/spreadreach/adminlogin.php","_self");
        }
        else{
            alert("something went wrong, try again");
        }
    });

}