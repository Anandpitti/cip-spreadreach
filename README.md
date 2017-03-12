# cip-spreadreach

##prerequisites to run this project
`1. apache server(xampp) for running the php files
2. mysql server(xampp) for maintaining the database
3. node js installed in the system to run the node js scripts(npm and noddejs)`

#how to run

###client or user side - node accesspoints
1. direct to nodejs folder 
2. [optinal] run command "node initialise.js portnumber" to setup the rewuired db tables for portnumber
3. run command "node nodeaccesspoint.js portnumber nportnumber" to run the nodeaccesspoint for portnumber
4. go to the userpage.php and register the complaint

###server or control side - admins
1. direct to nodejs folder
2. run command "node adminpage.js portnumber nportnumber" to run the nodeaccesspoint for portnumber
3. go to the adminlogin.php and move accordingly

for preconfigured db, sql file is given along with the code
