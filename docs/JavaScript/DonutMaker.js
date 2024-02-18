let donut = 0;
let auto = 0;
let multi = 0;
let autoCost = 100;
let multiCost = 100;
let multiDonut = 1;
let hightScore = 0;
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
    if (donut > hightScore) {
        hightScore = donut;
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
    document.getElementById("hSNum").innerHTML = hightScore.toFixed();
    document.getElementById("autoCount").innerHTML = auto;
    document.getElementById("autoCost").innerHTML = autoCost.toFixed(2);
    document.getElementById("multiCount").innerHTML = multi;
    document.getElementById("multiCost").innerHTML = multiCost.toFixed(2);
    document.getElementById("donutCount").innerHTML = donut.toFixed(2);
    document.title = donut.toFixed() + " Donuts-Donut Maker";
}




//modals 1

const modalOne = document.getElementById("aboutModal");
modalOne.style.display = "none";

// Get the button that opens the modal
const btnOne = document.getElementById("about");

// Get the <span> element that closes the modal
const spanOne = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btnOne.onclick = function() {
  modalOne.style.display = "block";
  modalTwo.style.display = "none";
  modalThree.style.display = "none";
  modalFour.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
spanOne.onclick = function() {
  modalOne.style.display = "none";
}

//modals 2

const modalTwo = document.getElementById("contactModal");
modalTwo.style.display = "none";

// Get the button that opens the modal
const btnTwo = document.getElementById("contact");

// Get the <span> element that closes the modal
const spanTwo = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
btnTwo.onclick = function() {
  modalTwo.style.display = "block";
  modalOne.style.display = "none";
  modalThree.style.display = "none";
  modalFour.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
spanTwo.onclick = function() {
  modalTwo.style.display = "none";
}

//modals 3

const modalThree = document.getElementById("inspirationModal");
modalThree.style.display = "none";

// Get the button that opens the modal
const btnThree = document.getElementById("inspiration");

// Get the <span> element that closes the modal
const spanThree = document.getElementsByClassName("close")[2];

// When the user clicks on the button, open the modal
btnThree.onclick = function() {
  modalThree.style.display = "block";
  modalOne.style.display = "none";
  modalTwo.style.display = "none";
  modalFour.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
spanThree.onclick = function() {
  modalThree.style.display = "none";
}

//modals 4

const modalFour = document.getElementById("shopModal");
modalFour.style.display = "none";

// Get the button that opens the modal
const btnFour = document.getElementById("shop");

// Get the <span> element that closes the modal
const spanFour = document.getElementsByClassName("close")[3];

// When the user clicks on the button, open the modal
btnFour.onclick = function() {
  modalFour.style.display = "block";
  modalOne.style.display = "none";
  modalTwo.style.display = "none";
  modalThree.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
spanFour.onclick = function() {
  modalFour.style.display = "none";
}

//Change background

function bg1(){
  document.body.style.background = "url('/docs/images/Bg1.jpg') repeat";
}

function bg2(){
  if(i < 1){
    if(donut >= 100){
    donut -= 100;
    document.body.style.background = "url('/docs/images/Bg2.jpg') repeat";
    i++;
    };
  }
  else{
    document.body.style.background = "url('/docs/images/Bg2.jpg') repeat";
  };
  update();
}

function bg3(){
  if(j < 1){
    if(donut >= 100){
    donut -= 100;
    document.body.style.background = "url('/docs/images/Bg3.jpg') repeat";
    j++;
    };
  }
  else{
    document.body.style.background = "url('/docs/images/Bg3.jpg') repeat";
  };
  update();
}

//Change header background

let headerbg = document.getElementById("header")

function hdBg1(){
  headerbg.style.background = "url('/docs/images/hdBg1.jpg') repeat";
}

function hdBg2(){
  if(k < 1){
    if(donut >= 50){
    donut -=50;
    headerbg.style.background = "url('/docs/images/hdBg2.jpg') repeat";
    k++;
    };
  }
  else{
    headerbg.style.background = "url('/docs/images/hdBg2.jpg') repeat";
  };
  update();
}

function hdBg3(){
  if(l < 1){
    if(donut >= 50){
    donut -=50;
    headerbg.style.background = "url('/docs/images/hdBg3.jpg') repeat";
    l++;
    };
  }
  else{
    headerbg.style.background = "url('/docs/images/hdBg3.jpg') repeat";
  };
  update();
}

//Change donut

let dnimg = document.getElementById("donut")

function dn1(){
  document.getElementById('donut').src='/docs/images/Donut1.png';
}

function dn2(){
  if(m < 1){
    if(donut >= 200){
    donut -=200;
    document.getElementById('donut').src='/docs/images/Donut2.png';
    m++;
    };
  }
  else{
    document.getElementById('donut').src='/docs/images/Donut2.png';
  };
  update();
}

function dn3(){
  if(n < 1){
    if(donut >= 200){
    donut -=200;
    document.getElementById('donut').src='/docs/images/Donut3.png';
    n++;
    };
  }
  else{
    document.getElementById('donut').src='/docs/images/Donut3.png';
  };
  update();
}