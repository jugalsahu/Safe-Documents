window.onload = function () {
	var clist = document.getElementById("contacts");
	if (clist.children.length == 0) {
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
			var edit = document.createElement("I");
			edit.setAttribute("class", "fa fa-edit");
			edit.setAttribute("id", "delete-icon");
			edit.setAttribute("title", "edit contact");
			var save = document.createElement("I");
			var saved = document.createElement("SPAN");
			save.setAttribute("class", "fa fa-save");
			save.setAttribute("id", "delete-icon");
			save.setAttribute("title", "save contact");
			con.appendChild(fieldset);
			fieldset.appendChild(legend);
			fieldset.appendChild(ol);
			ol.appendChild(li_one)
			ol.appendChild(li_two);
			ol.appendChild(trash);
			ol.appendChild(edit);
			ol.appendChild(save);
			ol.appendChild(saved);
			save.style.display = "none";
			legend.appendChild(document.createTextNode(json_extract.fullname));
			li_one.appendChild(document.createTextNode(json_extract.pnum));
			li_two.appendChild(document.createTextNode(json_extract.snum));
			saved.appendChild(document.createTextNode("saved successfully !"));
			saved.style.color = "red";
			saved.style.fontFamily = "sans-serif";
			saved.style.fontWeight = "bold";
			saved.style.float = "right";
			saved.style.clear = "both";
			saved.style.marginTop = "5px";
			saved.style.display = "none";
			del_contact(keys, trash);
			edit_contact(keys, edit, save, saved);
		}
	}
}

show_contacts();

/* delete contact */

function del_contact(contact_name, del_btn) {
	del_btn.onclick = function () {
		var answer = confirm("Do you want to delet contact ? ");
		if (answer == true) {
			del_btn.parentElement.remove();
			localStorage.removeItem(contact_name);
			window.location = location.href;
			var clist = document.getElementById("contacts");
			if (clist.children.length == 0) {
				document.getElementById("c-list").innerHTML = "No contact found";
			}
		}

	}
}

/* edit contact */

function edit_contact(contact_name, edit_btn, save_btn, saved) {
	edit_btn.onclick = function () {
		save_btn.style.display = "block";
		var ol = this.parentElement;
		var fieldset = ol.parentElement;
		var legend = fieldset.getElementsByTagName("LEGEND");
		legend[0].setAttribute("contenteditable", "true");
		legend[0].focus();
		var li = ol.getElementsByTagName("LI");
		var i;
		for (i = 0; i < li.length; i++) {
			li[i].setAttribute("contenteditable", "true");
		}


		var recent_legend;
		var current_legend;
		legend[0].onclick = function () {
			recent_legend = this.innerHTML;
		}

		legend[0].onblur = function () {
			current_legend = this.innerHTML;
		}

		var recent_number = [];
		var current_number = [];
		li[0].onclick = function () {
			recent_number[0] = this.innerHTML;
		}
		li[1].onclick = function () {
			recent_number[1] = this.innerHTML;
		}

		li[0].onblur = function () {
			current_number[0] = this.innerHTML;
		}
		li[1].onblur = function () {
			current_number[1] = this.innerHTML;
		}

		save_btn.onclick = function(){
			var edit_data = {
				fullname:current_legend==undefined? legend[0].innerHTML:current_legend,
				pnum:current_number[0]==undefined?li[0].innerHTML:current_number[0],
				snum:current_number[1]==undefined?li[1].innerHTML:current_number[1]
			};
			var final_data = JSON.stringify(edit_data);
			var txt = localStorage.getItem(contact_name);
			localStorage.setItem(contact_name,txt.replace(txt,final_data));
			saved.style.display="block";
			setTimeout(function(){
				save_btn.style.display="none";
				saved.style.display="none";
			},2000);
		}
	}
}

/* search cotact */

function search_contact(user_inut) {
	var keyword = user_inut.value.toUpperCase();
	var contact_list = document.getElementById("contacts");
	var legend = contact_list.getElementsByTagName("LEGEND");
	var i;
	for (i = 0; i < legend.length; i++) {
		if (legend[i].innerHTML.toUpperCase().indexOf(keyword) != -1) {
			legend[i].parentElement.style.display = "";
		}
		else {
			legend[i].parentElement.style.display = "none";
		}
	}
}

/* logout page */
function logout(){
	var user = confirm("Are you sure ?");
	if(user== true)
	{
		sessionStorage.clear();
		setTimeout(function(){
			window.location = "../../index.html";
		},2000);
	}
}

/* restore contacts */
function restore_contact(){
	var page = document.getElementById("restore-contacts");
	var restore_table = document.getElementById("restore-table");
	page.style.height ="100vh";
	page.style.transition="0.5s";
}