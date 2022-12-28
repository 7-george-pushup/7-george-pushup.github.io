sessionStorage.setItem("active", false);

//=============== Set Date
const today = new Date();
var date = today.getDate();
const dateID = date + today.getMonth() + today.getFullYear();

const titleDate = document.getElementById('title-date');
const titleYear = document.getElementById('title-year');

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let month = months[today.getMonth()];
const year = " " + today.getFullYear();

var dateSuffix = "th Of ";
if (date == 1 || date == 21 || date == 31) {
  dateSuffix = "st Of ";
}
if (date == 2 || date == 22) {
  dateSuffix = "st Of ";
}
if (date == 3 || date == 23) {
  dateSuffix = "rd Of ";
}
titleDate.textContent = date + dateSuffix + month + year;  

//=============== Generate Challenges
let challenges;

challenges = [
  ["Bring Sally Up", "Regular Pushups", "a1", 4, 20, 35, 50, 70, "All credits to the artist."],
  ["Royal Marine Pushups", "Strict Tricep Pushups", "a2", 7, 30, 60, 100, 100, "All credits to Sean Lerwill of PRMC."],
  ["Exhaustion", "Strict Tricep Pushups", "a3", 10, 30, 50, 65, 80, "Try my other projects at 7-george.github.io"],
  ["Bring Sally Up", "Regular Pullups", "b3", 1, 7, 20, 40, 60, "All credits to the artist."],
  ["Royal Marine Pullups", "Strict Pullups", "b1", 7, 40, 70, 100, 100, "All credits to Sean Lerwill of PRMC."],
  ["Bring Sally Up", "Half Muscle Ups", "c1", 1, 3, 7, 20, 40, "All credits to the artist."],
  ["Eternal Hang", "Dead Hang", "d1", 2, 15, 20, 40, 60, "Try my other projects at 7-george.github.io"]
];

for (let i = 0; i < challenges.length; i++) {
  var title = document.createElement("h3");
  title.textContent = challenges[i][0];
  var subtitle = document.createElement("h4");
  subtitle.textContent = challenges[i][1];

  var element = document.createElement("a");
  element.appendChild(title);
  element.appendChild(subtitle);
  element.className = "challenge";
  element.id = challenges[i][2][0];
  element.href = "challenge.html";

  if (challenges[i][2][0] == "a") {
    document.getElementById('pushup-challenges').appendChild(element);
  }
  if (challenges[i][2][0] == "b") {
    document.getElementById('pullup-challenges').appendChild(element);
  }
  if (challenges[i][2][0] == "c") {
    document.getElementById('muscleover-challenges').appendChild(element);
  }
  if (challenges[i][2][0] == "d") {
    document.getElementById('hanging-challenges').appendChild(element);
  }
}

//=============== Challenge Selected
var allChallenges = document.getElementsByClassName("challenge");

var activate = function() {

  var name = this.getElementsByTagName('h3')[0].textContent;
  var form = this.getElementsByTagName('h4')[0].textContent;
  var challengeID;

  var avgPercent;
  var top5;
  var top1;
  var point001;
  var point0001;

  for (let i = 0; i < challenges.length; i++) {
    if (name === challenges[i][0]) {
      if (form === challenges[i][1]) {
        challengeID = challenges[i][2];
        avgPercent = challenges[i][3];
        top5 = challenges[i][4];
        top1 = challenges[i][5];
        point001 = challenges[i][6];
        point0001 = challenges[i][7];
        credit = challenges[i][8];
      }
    }
  }

  sessionStorage.setItem("id", challengeID);
  sessionStorage.setItem("name", name);
  sessionStorage.setItem("form", form);
  sessionStorage.setItem("credit", credit);
  sessionStorage.setItem("indexRedirected", true);

  sessionStorage.setItem("avg-percent", avgPercent);
  sessionStorage.setItem("top5", top5);
  sessionStorage.setItem("top1", top1);
  sessionStorage.setItem("point001", point001);
  sessionStorage.setItem("point0001", point0001);

};

for (var i = 0; i < allChallenges.length; i++) {
  allChallenges[i].addEventListener('click', activate, false);
}

