<head>
	<link rel="stylesheet" type="text/css" href="css/adminpagecss.css">
	<script type="text/javascript" src="js/adminpagejs.js"></script>
	<script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
</head>

<body>
	<div class="fullpage">
		<form class="form">
			<div class="optiontab">
				<br><li> <a href="http://localhost/spreadreach/adminpagemydetails.php" target="adminpagetabdetails" id="defaultOpen" >my details</a></li>
				<br><br><li> <a href="http://localhost/spreadreach/adminpagemystatus.php" target="adminpagetabdetails" >my status</a></li>
				<br><br><li> <a href="http://localhost/spreadreach/adminpagequeries.php" target="adminpagetabdetails" >queries</a></li>
				<br><br><li> <a href="http://localhost/spreadreach/adminpageping.php" target="adminpagetabdetails" >ping</a></li>
				<br><br><li> <a href="http://localhost/spreadreach/adminpageupdate.php" target="adminpagetabdetails" >update</a></li>
				<br><br><li> <a href="http://localhost/spreadreach/adminpagecontact.php" target="adminpagetabdetails" >contact</a></li>
				<br><br><li> <a href="http://localhost/spreadreach/adminlogin.php" target="_parent" >log out</a></li>
			</div>
		</form>
	</div>
	<script>
			document.getElementById("defaultOpen").click();
	</script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</body>
