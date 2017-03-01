<head>
	<link rel="stylesheet" type="text/css" href="css/adminlogincss.css">
	<script type="text/javascript" src="js/adminloginjs.js"></script>
	<script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
</head>

<body>
	<div class="fullpage">

		<div class="titlename">
			<b>SPREAD REACH</b><br>
			<font style="font-size: 35%">welcome to spread reach control center</font>
		</div>
		
		<div class="optiontab">
			<li> <a href="javascript:void(0)" class="adminlogintabs" onclick="adminlogintab(event,'adminlogin')" id="defaultOpen" >login</a></li>
			<li> <a href="javascript:void(0)" class="adminlogintabs" onclick="adminlogintab(event,'adminregister')" >register</a></li>
		</div>
		
		<div id="adminlogin" class="optiondetails">
			<form class="form" style="max-width: 30%;">
				<br>
				<b>Node id</b><input type="text" name="lnodeid"><br><br>
				<b>Password</b><input type="password" name="lpassword"><br><br>
			</form>
			<div class="sendbutton">
					<li><button onclick="adminlogin()">login</button></li>
			</div>
		</div>
		<div id="adminregister" class="optiondetails">
			<form class="form">
				<br>
				<b>Organisation name</b> <input type="text" name="organisationname"><br><br>
				<b>Type of organisation</b>
				<select name="organisationtype">
  					<option value="hospital">Hospital</option>
 		 			<option value="policestation">Police Station</option>
  					<option value="ambulance">Ambulance</option>
  					<option value="policepatrol">Patrol</option>
  					<option value="policebooth">Police booth</option>
				</select><br><br>
				<b>Location / Address</b> <input type="text" name="location"><br><br>
				<b>Login id / Node id</b> <input type="text" name="rnodeid"><br><br>
				<b>Type password</b> <input type="password" name="rpassword"><br><br>
			</form>
			<div class="sendbutton">
				<li><button onclick="adminregister()">register</button></li>
			</div>
		</div>

	</div>
	<script>
			document.getElementById("defaultOpen").click();
			checkdb();
	</script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</body>
