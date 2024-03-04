let donut = 0;
let auto = 0;
let multi = 0;
let autoCost = 100;
let multiCost = 100;
let multiDonut = 1;
let highScore = 0;
let autoIntervals = []; // Array to store interval identifiers for auto clickers

function AddDonut() {
    if (multi > 0) {
        donut += multiDonut;
    } else {
        donut++;
    }
    update();
}

function AddAuto() {
    if (donut >= autoCost) {
        donut -= autoCost;
        auto++;
        autoCost += (autoCost * 0.1);
        let autoInterval = setInterval(autoClick, 3000 / auto);
        autoIntervals.push(autoInterval); // Store interval identifier
    }
    update();
}

function autoClick() {
    donut += multiDonut;
    update();
}

function AddMulti() {
    if (donut >= multiCost) {
        donut -= multiCost;
        multi++;
        multiCost += (multiCost * 0.2);
        multiDonut += (multiDonut * 0.1);
    }
    update();
}

function reset() {
    if (donut > highScore) {
        highScore = donut;
    }
    // Clear all auto clicker intervals
    autoIntervals.forEach(interval => clearInterval(interval));
    donut = 0;
    auto = 0;
    multi = 0;
    autoCost = 100;
    multiCost = 100;
    multiDonut = 1;
    update();
}

function update() {
    document.getElementById("hSNum").innerHTML = highScore.toFixed();
    document.getElementById("autoCount").innerHTML = auto;
    document.getElementById("autoCost").innerHTML = autoCost.toFixed(2);
    document.getElementById("multiCount").innerHTML = multi;
    document.getElementById("multiCost").innerHTML = multiCost.toFixed(2);
    document.getElementById("donutCount").innerHTML = donut.toFixed(2);
    document.title = donut.toFixed() + " Donuts-Donut Maker";

    let username = localStorage.getItem("remember");
    const data = { username, highScore, auto, autoCost, multi, multiCost, donut, multiDonut };
    const options = {
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch('/apiDonutMaker', options)
}

function logout(){
  let input;
  if(confirm("Are you sure you want to logout?")){
      window.location.replace("/index.html");
  }
}

function back(){
      window.location.replace("/html/mainMenu.html");
}