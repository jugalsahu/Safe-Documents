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