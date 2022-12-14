var today = new Date();

//About You
const feet = document.querySelector('#ft');
const inches = document.querySelector('#in');
const kilograms = document.querySelector('#kg');

//Load from localStorage
feet.value = JSON.parse(localStorage.getItem("feet"));
inches.value = JSON.parse(localStorage.getItem("inches"));
kilograms.value = JSON.parse(localStorage.getItem("weight"));

//----------- Check Today's Date ------------------//
var lastStoredDate = JSON.parse(localStorage.getItem("current-date"));
var realDate = today.getDate() + today.getMonth() + today.getFullYear();
if (!(lastStoredDate === realDate)) {
  //Select Pushup Challenges
  var randInt = parseInt(Math.floor(Math.random() * 2));

  //Select Sally Up
  if (randInt === 0) {
    localStorage.setItem("hide-prmc-pushups", JSON.stringify(today.getDate()));
  }

  //Select Prmc
  if (randInt === 1) {
    localStorage.setItem("hide-sally-up", JSON.stringify(today.getDate()));
  }

  //More Challenges Coming Soon
  if (randInt === 2) {
    localStorage.setItem("hide-sally-up", JSON.stringify(today.getDate()));
    localStorage.setItem("hide-prmc-pushups", JSON.stringify(today.getDate()));
  }

  //Update Date
  localStorage.setItem("current-date", JSON.stringify(realDate));
}

//----------- Hide/Unhide Elements -----------------//
var locked = false;
hide();
function hide() {
  //Locked Until Form Is Done
  if (localStorage.getItem("feet") === null || localStorage.getItem("inches") === null || localStorage.getItem("weight") === null) {
    document.getElementById('sub2').style.opacity = 0;
    locked = true;
  } else {
    document.getElementById('sub2').style.opacity = 1;
  }

  //Hide Elements
  if (today.getDate() === JSON.parse(localStorage.getItem("hide-sally-up"))) {
    if (document.getElementById('BringSallyUp') === null) return;
    document.getElementById('BringSallyUp').remove();
  }
  if (today.getDate() === JSON.parse(localStorage.getItem("hide-prmc-pushups"))) {
    if (document.getElementById('PrmcPushups') === null) return;
    document.getElementById('PrmcPushups').remove();
  }

  //Pushups Section Empty
  if (document.getElementById('BringSallyUp') === null && document.getElementById('PrmcPushups') === null) {
    document.getElementById('pushupSectionLabel').textContent = "Come back tomorrow for more.";
  }

}







//------------- Event Listeners -----------------//
const sallyupSeconds = document.querySelector('#SUsec');
const sallyupMinutes = document.querySelector('#SUmin');
const prmcPushupReps = document.querySelector('#prmc-pushup-reps');

inches.addEventListener('input', function () {
    if (this.value > 11) {
      inches.value = "11";
    }
    localStorage.setItem("inches", JSON.stringify(inches.value));
    hide();
});

feet.addEventListener('input', function () {
  localStorage.setItem("feet", JSON.stringify(feet.value));
  hide();
});

kilograms.addEventListener('input', function () {
  localStorage.setItem("weight", JSON.stringify(kilograms.value));
  hide();
});

if (!(document.getElementById("BringSallyUp") === null)) {
  sallyupSeconds.addEventListener('input', function () {
    if (this.value > 55) {
      sallyupSeconds.value = "55";
    }
  });
  
  sallyupMinutes.addEventListener('input', function () {
    if (this.value > 6) {
      sallyupMinutes.value = "6";
    }
  });
}

if (!(document.getElementById("PrmcPushups") === null)) {
  prmcPushupReps.addEventListener('input', function () {
    if (this.value > 60) {
      prmcPushupReps.value = "60";
    }
  });
}

function sallyUp() {
  if (parseInt(sallyupMinutes.value) === null) return;
  if (parseInt(sallyupSeconds.value) === null) return;
  if (JSON.parse(localStorage.getItem("hide-sally-up")) === today.getDate()) {
    return;
  }

  var minstosecs = sallyupMinutes.value * 60;
  var totalsecs = minstosecs + parseInt(sallyupSeconds.value);
  var reps = 0;

  if (totalsecs < 61) {
    reps = 2;
    
  }
  if (totalsecs >= 61) {
    reps = 8;
  }

  if (totalsecs >= 102) {
    reps = 12;
  }

  if (totalsecs >= 133) {
    reps = 18;
  }

  if (totalsecs >= 211) {
    reps = 30;
  }

  if (totalsecs >= 258) {
    reps = 38;
  }

  if (totalsecs >= 294) {
    reps = 43;
  }

  if (totalsecs >= 330) {
    reps = 48;
  }

  if (totalsecs >= 415) {
    reps = 60;
  }


  if (JSON.parse(localStorage.getItem("pushup-sallyupattempts")) == null) {
    localStorage.setItem("pushup-reps", reps + JSON.parse(localStorage.getItem("pushup-reps")));
    localStorage.setItem("pushup-sallyuptime", totalsecs);
    localStorage.setItem("pushup-sallyupattempts", 1);
  } else {
    var prt = parseInt(reps) + parseInt(JSON.parse(localStorage.getItem("pushup-reps")));
    var sut = parseInt(totalsecs) + parseInt(JSON.parse(localStorage.getItem("pushup-sallyuptime")));
    var sua = 1 + parseInt(JSON.parse(localStorage.getItem("pushup-sallyupattempts")));
    localStorage.setItem("pushup-reps", JSON.stringify(prt));
    localStorage.setItem("pushup-sallyuptime", JSON.stringify(sut));
    localStorage.setItem("pushup-sallyupattempts", JSON.stringify(sua));
  }

  localStorage.setItem("hide-sally-up", JSON.stringify(today.getDate()));
  window.location.reload();
  hide();
  }

function prmcPushups() {
  if (parseInt(prmcPushupReps.value) === null) return;
  var reps = prmcPushupReps.value;

  //------------ Add Reps To Total
  if (JSON.parse(localStorage.getItem("pushup-prmctotal")) == null) {
    localStorage.setItem("pushup-reps", reps);
    localStorage.setItem("pushup-prmctotal", reps);
    localStorage.setItem("pushup-prmcattempts", 1);
  } else {
    var prt = parseInt(reps) + parseInt(JSON.parse(localStorage.getItem("pushup-reps")));
    var pt = parseInt(reps) + parseInt(JSON.parse(localStorage.getItem("pushup-prmctotal")));
    var pa = 1 + parseInt(JSON.parse(localStorage.getItem("pushup-prmcattempts")));
    localStorage.setItem("pushup-reps", JSON.stringify(prt));
    localStorage.setItem("pushup-prmctotal", JSON.stringify(pt));
    localStorage.setItem("pushup-prmcattempts", JSON.stringify(pa));
  }

  localStorage.setItem("hide-prmc-pushups", JSON.stringify(today.getDate()));
  window.location.reload();
  hide();
}





/*=============================================
Statistics
==*/
updateStats();
function updateStats() {
  if (!(locked === true)) {

    //Define
    const totalRepCount = document.getElementById('totalreps');
    const totalWeightPushed = document.getElementById('totalweightpushed');
    
    const sallyupAverage = document.getElementById('suavg');
    
    const prmcPushupAverage = document.getElementById('prmcpushupavg');
    
    //Calculate
    var totalRepCountStat = JSON.parse(localStorage.getItem("pushup-reps"));
    var totalWeightPushedStat = totalRepCountStat * JSON.parse(localStorage.getItem("weight"));
    
    var sallyupAverageStat = 0;
    var minutes = 0;
    var seconds = 0;
    if (JSON.parse(localStorage.getItem("pushup-sallyuptime")) > 0) {
      sallyupAverageStat = JSON.parse(localStorage.getItem("pushup-sallyuptime")) / JSON.parse(localStorage.getItem("pushup-sallyupattempts"));
      var minutes = Math.floor(sallyupAverageStat / 60);
      var seconds = sallyupAverageStat - minutes * 60;
    }

    var prmcPushupAverageStat = 0;

    if (JSON.parse(localStorage.getItem("pushup-prmcattempts")) > 0) {
      prmcPushupAverageStat = JSON.parse(localStorage.getItem("pushup-prmctotal")) / JSON.parse(localStorage.getItem("pushup-prmcattempts"));
    }
    
    //Write
    totalRepCount.textContent = "Total Pushups : " + totalRepCountStat;
    totalWeightPushed.textContent = "Total Weight Pushed : " + totalWeightPushedStat + "KG";
    
    sallyupAverage.textContent = "Sally Up Average Time : " + minutes + "min " + parseInt(seconds) + "sec";
    prmcPushupAverage.textContent = "PRMC Pushup Average Score : " + parseInt(prmcPushupAverageStat);
    
    }
}
