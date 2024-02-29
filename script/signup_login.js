/* start signup code */
function signup() {
    var name = btoa(document.getElementById("name").value);
    var email = btoa(document.getElementById("email").value);
    var password = btoa(document.getElementById("password").value);
    var mobile = btoa(document.getElementById("mobile").value);

    if (name != "" && email != "" && password != "" && mobile != "") {
        var user_input = { name: name, email: email, password: password, mobile: mobile }
        var user_data = JSON.stringify(user_input);
        localStorage.setItem(email, user_data);

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("signup_success").innerHTML = "Sign up success";
        setTimeout(function () { document.getElementById("signup_success").innerHTML = ""; }, 2000);
        return false;
    }
    else{
        alert("some fields are not filled");
    }
    
}

function user_exist() {
    var email = btoa(document.getElementById("email").value);
    if (localStorage.getItem(email) != null) {
        document.getElementById("user_found").innerHTML = "User already existed";
        document.getElementById("password").disabled = true;
        document.getElementById("mobile").disabled = true;
        document.getElementById("email").classList.add("swing");
        document.getElementById("signup_submit").disabled = true;
        document.getElementById("signup_submit").style.cursor = "not-allowed";
        document.getElementById("email").style.background = "black";
        document.getElementById("email").style.color = "white";
        document.getElementById("email").onclick = function () {
            this.value = "";
            this.style.background = "";
            this.style.color = "";
            document.getElementById("user_found").innerHTML = "";
            document.getElementById("password").disabled = false;
            document.getElementById("mobile").disabled = false;
            document.getElementById("signup_submit").disabled = false;
        }
    }
}
/* end signup code */

/* start login code */
function login(){
    var user_name = btoa(document.getElementById("login_user").value);
    var user_password = btoa(document.getElementById("login_password").value);
    var user_input = {username:user_name,password:user_password};
    var user_data = JSON.stringify(user_input);
    sessionStorage.setItem(user_name,user_data);
    var session_data = sessionStorage.getItem(user_name);
    var user_details = JSON.parse(session_data);
    if(localStorage.getItem(user_details.username) == null)
    {
        alert("user not found");
    }
    else{
        var signup_input = localStorage.getItem(user_details.username);
        var signup_details = JSON.parse(signup_input);
        if(user_details.username == signup_details.email && user_details.password == signup_details.password)
        {
            location.replace("profile/profile.html");
            sessionStorage.setItem("user_mail",user_name);
            return false;
        }
        else{

            alert("password not match");
        }
        
    }

}

/* end login code */
