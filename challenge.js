//======= User Redirected From Index
if (JSON.parse(sessionStorage.getItem("indexRedirected")) === true) {
    sessionStorage.setItem("indexRedirected", false);
} else {
    window.location.replace("index.html");
}

var challengeID = sessionStorage.getItem("id");
var challengeName = sessionStorage.getItem("name");
var form = sessionStorage.getItem("form");
var credit = sessionStorage.getItem("credit");

var point0001 = sessionStorage.getItem("point0001");
var point001 = sessionStorage.getItem("point001");
var top1 = sessionStorage.getItem("top1");
var top5 = sessionStorage.getItem("top5");
var avgPercent = sessionStorage.getItem("avg-percent");

var x = document.getElementById('point0001');
var s = document.getElementById('point001');
var a = document.getElementById('top1');
var b = document.getElementById('top5');
var c = document.getElementById('avg');

var timer = document.getElementById('stopwatch');

//========= Customise To Challenge
var titleName = document.getElementById('title-name');
var titleForm = document.getElementById('title-form');
var notice = document.getElementById('notice');

notice.textContent = credit;

var noPluralForm = form;
if (!(challengeID[0] === 'd')) {
    noPluralForm = form.toLowerCase().substring(0, form.length -1);
}

titleName.textContent = challengeName;
titleForm.textContent = "With " + noPluralForm + " form.";

var audio = document.getElementById("playAudio");
audio.setAttribute('src', "./Audio/" + challengeName + ".mp3");

function updateStats() {

    //Challenge Completed
    var time = audio.currentTime;

    //Update Timer Text
    var minutes = Math.floor(time / 60);
    var seconds = parseInt(time - minutes * 60);
    minutes = minutes + ":";
    if (seconds < 10) {seconds = "0" + seconds.toString();}
    if (seconds === 0) {seconds = "00"}
    timer.textContent = minutes + seconds;
    var percentageVal = audio.currentTime / audio.duration * 100;
    var percent = Math.round(percentageVal * 100) / 100
    var percentStr = percent.toString() + "%";

    //Client
    client.style.width = percentStr;

    //Opponents
    if (percentageVal < point0001) {x.style.width = percentStr;}
    if (percentageVal < point001) {s.style.width = percentStr;}
    if (percentageVal < top1) {a.style.width = percentStr;} 
    if (percentageVal < top5) {b.style.width = percentStr;} 
    if (percentageVal < avgPercent) {c.style.width = percentStr;} 
    
    setTimeout(() => {updateStats();}, "100")
}