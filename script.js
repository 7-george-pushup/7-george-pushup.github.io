const today = new Date();
var date = today.getDate();
const dateID = date + today.getMonth() + today.getFullYear();

//================= Random Note
const note = document.getElementById('note');
const notes = ["Make every rep as clean as possible.", "Spread your fingers out more.", "Control your breathing.", "Do not bounce off tendons.", "Practice downward holds to stay in control longer.", "Keep your hands just past shoulder width.", "Avoid resting/relying on joints."];
var rand = Math.floor(Math.random() * 8) - 1;
note.textContent = notes[rand];

//================= Statistics
const totalChallenges = document.getElementById('total-challenges');

updateStatistics();
function updateStatistics() {
  if (!(localStorage.getItem("total-challenges") === null)) {
    if (JSON.parse(localStorage.getItem("total-challenges")) === 1) {
      totalChallenges.textContent = "You've only completed a single challenge so far...";
    } else {
      totalChallenges.textContent = "You have completed " + JSON.parse(localStorage.getItem("total-challenges")) + " challenges.";
    }
  } else {
    totalChallenges.textContent = "You have not completed any challenges yet.";
  }
}


//================= Hide Challenge After Completion
hideChallenge();
function hideChallenge() {
  if (localStorage.getItem("last-challenge") == dateID) {
    document.getElementById("challenge-container").remove();
    document.getElementById("label").textContent = "Next challenge unlocks tomorrow.";
    var remainingHours = 23 - today.getHours();
    const pushupSectionLabel = document.getElementById('date');
    pushupSectionLabel.textContent = remainingHours + " Hours Remaining.";
    updateStatistics();
  } else {

    //================ Set A Challenge
    const challenges = ["Bring Sally Up","Pushup Torture","Rep Sprint","Refrain Pushups", "5 Minute Killer", "Deception", "Pushup Torture", "Refrain Pushups", "PRMC Pushup Test", "Rep Sprint", "Pushup Torture", "Bring Sally Up", "Deception", "Rep Sprint", "Refrain Pushups", "5 Minute Killer", "Deception", "Pushup Torture", "Rep Sprint", "Bring Sally Up", "Refrain Pushups", "PRMC Pushup Test", "Bring Sally Up", "Pushup Torture", "Rep Sprint", "Refrain Pushups", "Pushup Torture", "Bring Sally Up", "Rep Sprint", "Deception", "5 Minute Killer"];
    var selectChallenge = date - 1;

    const challengeText = document.getElementById('challenge');
    challengeText.textContent = challenges[selectChallenge];

    var audio = document.getElementById('challenge-audio');

    var source = document.getElementById('challenge-audio-source');
    source.src = challenges[selectChallenge] + ".mp3";

    audio.load();

    //=============== Set Date
    const dateLabel = document.getElementById('date');

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let month = months[today.getMonth()];

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

    dateLabel.textContent = date + dateSuffix + month;  
  }
}

//======================== Submit Reps
function submitReps() {
  var newCTotal = 1;
  if (!(localStorage.getItem("total-challenges") === null)) {
    newCTotal = newCTotal + parseInt(JSON.parse(localStorage.getItem("total-challenges")));
  }
  localStorage.setItem("total-challenges", newCTotal);
  localStorage.setItem("last-challenge", dateID);
  hideChallenge();
}
