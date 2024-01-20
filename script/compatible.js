/* start browser check */

	function check_browser(){
		if(navigator.userAgent.indexOf("MSIE") != -1)
		{
			var webpage = document.getElementById("webpage");
			webpage.style.display="none";
			document.body.style.background="black";
			document.body.innerHTML = "<h1 align='center' style='font-family:sans-serif;font-size:100px;'>Please open in chrome browser</h1>";
			document.body.style.color="white";
		}
	}

	check_browser();

/* end browser check */


/* start cookies check */

	function checkCookieEnabled(){
		if(navigator.cookieEnabled == false)
		{
			var webpage = document.getElementById("webpage");
			webpage.style.display="none";
			document.body.style.background="black";
			document.body.innerHTML = "<h1 align='center' style='font-family:sans-serif;font-size:100px;'>Please enable cookies..</h1>";
			document.body.style.color="white";
		}
	}

	checkCookieEnabled();

/* start cookies check */


/* start sidebar coding */

	function sidebar(){
		var sidebar = document.getElementById("side-bar");
		sidebar.style.display="block";
		sidebar.style.animation = "sidebar 0.2s";
		sidebar.style.animationFillMode = "forwards";
	}

	function sidebar_close(){
		var sidebar = document.getElementById("side-bar");
		sidebar.style.display="none";
	}

/* end sidebar coding */