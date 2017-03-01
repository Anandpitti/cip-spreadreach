<head>
	<link rel="stylesheet" type="text/css" href="css/userpagecss.css">
	<script type="text/javascript" src="js/userpagejs.js"></script>
	<script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
</head>

<body>
	<div class="fullpage">

		<div class="titlename">
			<b>SPREAD REACH</b>
		</div>
		
		<div class="optiontab">
			<li> <a href="javascript:void(0)" class="userpagetabs" onclick="userpagetab(event,'accident')" id="defaultOpen" >accident</a></li>
			<li> <a href="javascript:void(0)" class="userpagetabs" onclick="userpagetab(event,'snatch')" >chain snatch</a></li>
			<li> <a href="javascript:void(0)" class="userpagetabs" onclick="userpagetab(event,'traffic')" >traffic jam</a></li>
		</div>
		
		<div id="accident" class="optiondetails">
			<form class="form">
				<br>
				<b>Location of the accident</b><input type="text" name="accidentlocation"><br><br>
				<b>Number of people injured</b><input type="text" name="accidentinjured"><br><br>
				<b>Time of accident</b><input type="text" name="accidenttime"><br><br>
				<b>vehicle type</b> 
				<input class="vehicleradio" type="radio" name="avehicletype" value="bike">bike
				<input class="vehicleradio" type="radio" name="avehicletype" value="cars">car
				<input class="vehicleradio" type="radio" name="avehicletype" value="otherheavy">other heavy vehicles<br><br>
			</form>
		</div>
		<div id="snatch" class="optiondetails">
			<form class="form">
				<b>Location of the incident</b><input type="text" name="snatchlocation"><br><br>
				<b>Is the victim injured?</b>
				<input class="snatchradio" type="radio" name="snatchinjured" value="yes">yes
				<input class="snatchradio" type="radio" name="snatchinjured" value="no">no<br><br>
				<b>Number of snatchers</b>
				<select name="snatcherno">
  					<option value="1">1</option>
 		 			<option value="2">2</option>
  					<option value="3">3</option>
  					<option value="4">more</option>
				</select><br><br>
				<b>vehicle type used by snatchers if any</b>
				<input class="snatchradio" type="radio" name="svehicletype" value="bike">bike
				<input class="snatchradio" type="radio" name="svehicletype" value="car">car
				<input class="snatchradio" type="radio" name="svehicletype" value="other">others<br><br>
			</form>
		</div>
		<div id="traffic" class="optiondetails">
			<form class="form">
				<b>Location</b><input type="text" name="trafficlocation"><br><br>
				<b>Time in minutes for which the traffic is stagnant</b><input type="text" name="traffictime"><br><br>
				<b>Signal malfunction?</b>
				<input class="trafficradio" type="radio" name="signal" value="yes">yes
				<input class="trafficradio" type="radio" name="signal" value="no">no
			</form>
		</div>
		
		<div class="sendbutton">
			<li><button onclick="sendrequest()">send</button></li>
		</div>

	</div>
	<script>
			document.getElementById("defaultOpen").click();
			checkdb();
	</script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</body>
