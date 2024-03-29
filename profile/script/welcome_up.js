// url copy paste security

function url_secure() {
    if (sessionStorage.length <= 0) {
        var page = document.getElementById("profile-page");
        page.style.display = "none";
        document.body.style.background = "black";
        document.body.innerHTML = "<h1 style='color:white;font-size:100px;font-family:sans-serif;text-align:center'>Illigal action performed</h1>";
    }
}

url_secure();

// upload pic coding

function upload_pic() {
    var input = document.getElementById("profile-pic-upload");
    if (input.files.length > 0 && input.files[0].size < 1050000) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onloadend = function (event) {
            var show = document.getElementById("upload-btn");
            var image_url = event.target.result;
            show.style.backgroundImage = `url(${event.target.result})`;
            show.style.backgroundSize = "cover";
            show.style.backgroundRepeat = "no-repeat";
            document.getElementById("upload-icon").style.opacity = "0";
            var ficon = document.getElementById("next-icon");
            ficon.style.display = "block";
            ficon.onclick = function () {
                localStorage.setItem(sessionStorage.getItem("user_mail") + "image_url", image_url);
                var hide_uploadbox = document.getElementById("profile-bg");
                hide_uploadbox.style.display = "none";
                window.location = location.href;
            }
        }
    }
    else {
        alert("please upload less then 1mb file");
    }
}

// user name showing

function profile_name() {
    var name = document.getElementById("welcome");
    var user_mail = sessionStorage.getItem("user_mail");
    var user_details = localStorage.getItem(user_mail);
    var user_name = JSON.parse(user_details);
    name.innerHTML = atob(user_name.name);
}

profile_name();

// stop showing upload

function stop_upload() {
    if (localStorage.getItem(sessionStorage.getItem("user_mail") + "image_url") != null) {
        var hide_uploadbox = document.getElementById("profile-bg");
        hide_uploadbox.style.display = "none";
    }
}

stop_upload();

// profile name and pic showing
function showing_pic_name() {
    var profile_name = document.getElementById("profile-name");
    var profile_pic = document.getElementById("profile-pic");
    var user_mail = sessionStorage.getItem("user_mail");
    var user_details = localStorage.getItem(user_mail);
    var user_data = JSON.parse(user_details);
    profile_name.innerHTML = atob(user_data.name);

    var user_profile = localStorage.getItem(user_mail + "image_url");
    profile_pic.style.backgroundImage = "url(" + user_profile + ")";
    profile_pic.style.backgroundRepeat = "no-repeat";
    profile_pic.style.backgroundSize = "cover";
    location.assign = location.href;

}

showing_pic_name();

// signout coding

function logout(){
    sessionStorage.clear();
    document.getElementById("profile-notice").style.display="block";
    setTimeout(function(){
        window.location ="../index.html";
    },2000);
}