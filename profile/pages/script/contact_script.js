window.onload = function(){
	var clist = document.getElementById("contacts");
	if(clist.children.length == 0){
		document.getElementById("c-list").innerHTML = "No contact found";
	}
}

// showing profile picture
function show_profile_pic() {
	var pic_box = document.getElementById("pic-box");
	var image_name = localStorage.getItem(sessionStorage.getItem("user_mail") + "image_url");
	pic_box.style.background = "url(" + image_name + ")";
	pic_box.style.backgroundRepeat = "no-repeat";
	pic_box.style.backgroundSize = "cover";
}

show_profile_pic();


/* add contacts coding */

function add_contacts() {
	var fullname = document.getElementById("fullname").value;
	var pnum = document.getElementById("pnum").value;
	var snum = document.getElementById("snum").value;
	if (fullname != "" && pnum != "" && snum != "") {
		if (isNaN(pnum)) {
			alert("please enter a valid primary number");
		}
		else {
			if (isNaN(snum)) {
				alert("please enter a valid secondary number");
			}
			else {
				var user = { fullname: fullname, pnum: pnum, snum: snum };
				var user_details = JSON.stringify(user);
				localStorage.setItem(fullname + " contact", user_details);
				var saved = document.getElementById("saved");
				document.getElementById("add-form").reset();
				saved.style.display = "block";
				setTimeout(function () {
					saved.style.display = "none";
				}, 2000);
				window.location = location.href;
			}
		}
	}
	else {
		alert("some fields are empty");
	}
}
// number showing coding

function show_contacts() {
	var i;
	for (i = 0; i < localStorage.length; i++) {
		var keys = localStorage.key(i);
		if (keys.match("contact")) {
			var json_text = localStorage.getItem(keys);
			var json_extract = JSON.parse(json_text);
			var con = document.getElementById("contacts");
			var fieldset = document.createElement("FIELDSET");
			var legend = document.createElement("LEGEND");
			var ol = document.createElement("OL");
			var li_one = document.createElement("LI");
			var li_two = document.createElement("LI");
			var trash = document.createElement("I");
			trash.setAttribute("class", "fa fa-trash");
			trash.setAttribute("id", "delete-icon");
			trash.setAttribute("title", "delete contact");
			con.appendChild(fieldset);
			fieldset.appendChild(legend);
			fieldset.appendChild(ol);
			ol.appendChild(li_one)
			ol.appendChild(li_two);
			fieldset.appendChild(trash);
			legend.appendChild(document.createTextNode(json_extract.fullname));
			li_one.appendChild(document.createTextNode(json_extract.pnum));
			li_two.appendChild(document.createTextNode(json_extract.snum));
			del_contact(keys,trash);
		}
	}
}

show_contacts();

/* delete contact */

function del_contact(contact_name, del_btn){
	del_btn.onclick = function(){
		var answer = confirm("Do you want to delet contact ? ");
		if(answer==true)
		{
			del_btn.parentElement.remove();
			localStorage.removeItem(contact_name);
			var clist = document.getElementById("contacts");
			if(clist.children.length == 0){
			document.getElementById("c-list").innerHTML = "No contact found";
			}
		}

	}
}
