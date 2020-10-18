class target {
    constructor(trg) {
        this.target = document.getElementById(trg);
    }
    respawn() {
        this.target.style.top = this.getRndInteger(0, window.innerHeight - 160) + "px";
        this.target.style.left = this.getRndInteger(0, window.innerWidth - 160) + "px";
    }
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

// Cookies
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// Direct event functions
function Button(event) {
    checkHit(event.clientX, event.clientY);
    if (event.which == 1) {
        audio.play();
    }
}
function start(Game) {
    Game.remove();
}
function UpdatePointer(event) {
    let curser = document.getElementById("curser");
    curser.style.left = event.clientX + "px";
    curser.style.top = event.clientY + "px";
}
$(window).on("beforeunload", function () {
    if(getCookie("High")<SCORES){
        setCookie("High", SCORES, 365);
    }
})
// Management Functions
function setHighScores(Scores) {
    document.getElementsByClassName("highscores")[0].innerHTML = "High Scores: " + Scores;
}
function getDistance(xA, yA, xB, yB) {
    var xDiff = xA - xB;
    var yDiff = yA - yB;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}
function checkHit(x, y) {
    let trg = document.getElementById("target");
    let tx = Number(trg.style.left.split('px')[0]) + 75;
    let ty = Number(trg.style.top.split('px')[0]) + 75;
    console.log(getDistance(x, y, tx, ty));

    if (getDistance(x, y, tx, ty) < 50) {
        kion.play();
        SCORES++;
        document.getElementById("scores").innerHTML = SCORES;
        $('#hitBlood').css('top', `${ty}px`);
        $('#hitBlood').css('left', `${tx}px`);
        $('#hitBlood').css('opacity', `1`);
    } else {
        go.play();
        SCORES--;
        document.getElementById("scores").innerHTML = SCORES;
    }
}


{
    if (navigator.platform != "Win32"){
        $("*").hide();
        alert("Plese use Desktop to view this Site! You Biaatch");
    }
    setHighScores(getCookie("High"));
}

var audio = document.getElementById("awm");
var kion = document.getElementById("kion");
var go = document.getElementById("go");
var SCORES = 0;
let Enymy = new target('target', 'screen');

setInterval(function () { Enymy.respawn(); }, 1000);














