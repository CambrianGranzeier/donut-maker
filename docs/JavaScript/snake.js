let snakebod = [ {x:0, y:0} ];
let snakedir = 1;
let snakeleng = 1;
let foodloc = {x:1, y:1};
let score = 0;
let highScore = 0;
const gridH = 20;
const gridW = 50;
let diff;
let acc = 0;
let grid = document.getElementById("grid");

grid.style.gridTemplateColumns = "repeat(" + gridW + ", 20px)";
grid.style.gridTemplateRows = "repeat(" + gridH + ", 20px)";
for(let i = 0; i < gridH; i++){
    for(let j = 0; j < gridW; j++){
        let gridSpace = document.createElement("div");
        gridSpace.id = j + "," + i;
        gridSpace.classList.add("grid-item");
        grid.append(gridSpace); 
    }
}

const modal = document.getElementById("diffModal");
modal.style.display = "none";

document.addEventListener("DOMContentLoaded", function() {
    modal.style.display = "block";
    const span = document.getElementsByClassName("close")[0];
    clearInterval(gameInterval);

    span.addEventListener("click", function() {
        modal.style.display = "none";
    });
});

let gameInterval;
function easy(){
    diff = "Easy";
    gameInterval = setInterval(gameplay, 200);
    modal.style.display = "none";
}

function normal(){
    diff = "Normal";
    gameInterval = setInterval(gameplay, 200);
    modal.style.display = "none";
}

function hard(){
    diff = "Hard";
    gameInterval = setInterval(gameplay, 200);
    modal.style.display = "none";
}

function drawFood(){
    let foodSpace = document.getElementById(foodloc.x + "," + foodloc.y);
    foodSpace.innerHTML = `<img id="donut" src="/images/favicon-16x16.png" alt="a donut"></img>`;
}
RandomizeFoodloc();
drawFood();

function drawSnake(){
    for(let i = 0; i < snakebod.length; i++){
        let snakeSpace = document.getElementById(snakebod[i].x + "," + snakebod[i].y);
        if(snakeSpace == null){
            resetgame();
        } else {
            snakeSpace.innerHTML = `<img id="donut" src="/images/favicon-16x16.png" alt="a donut"></img>`;
        }
    }
}
drawSnake();

function RandomizeFoodloc(){
    foodloc.x = Math.floor(Math.random() * gridW);
    foodloc.y = Math.floor(Math.random() * gridH);
}

function snakeMove(){
    let snakeHead = {x:false, y:false};
    switch(snakedir){
        case 0:
            snakeHead.x = snakebod[0].x;
            snakeHead.y = snakebod[0].y - 1;
            break;
        case 1:
            snakeHead.x = snakebod[0].x;
            snakeHead.y = snakebod[0].y + 1;
            break;
        case 2:
            snakeHead.x = snakebod[0].x + 1;
            snakeHead.y = snakebod[0].y;
            break;
        case 3:
            snakeHead.x = snakebod[0].x - 1;
            snakeHead.y = snakebod[0].y;
            break;
    }
    
    let die = false;
    if(diff == "Easy" || diff == "Normal"){
        if(snakeHead.x < 0){
            snakeHead.x += gridW;
        }
    
        if(snakeHead.y < 0){
            snakeHead.y += gridH
        }

        snakeHead.x = snakeHead.x % gridW;
        snakeHead.y = snakeHead.y % gridH;
    } else if(diff == "Hard"){
        if(snakeHead.x < 0 || snakeHead.x >= gridW){
            die = true;
        }
    
        if(snakeHead.y < 0 || snakeHead.y >= gridH){
            die = true;
        }
    }
    snakebod.unshift(snakeHead);

    let grow = false;
    for(let i = 0; i < snakebod.length; i++){
        grow = snakebod[i].x == foodloc.x && snakebod[i].y == foodloc.y;
        if(grow){
            clearInterval(gameInterval);
            if(diff == "Easy"){
                gameInterval = setInterval(gameplay, 250);
            }
            if(diff == "Normal" || diff == "Hard"){
                gameInterval = setInterval(gameplay, 200 - (acc));
                if(score % 5 == 0){
                    acc = acc + 10;
                }
            }
            snakeleng++;
            score++;
            RandomizeFoodloc();
            break;
        }
    }

    if(!grow){
        snakebod.pop();
    }

    for(let i = 1; i < snakebod.length; i++){
        die = snakebod[i].x == snakeHead.x && snakebod[i].y == snakeHead.y;

        if(die){
            break;
        }
    }

    if(die){
        resetgame();
    }
}

function gameplay(){
    snakeMove();
    clearGrid();
    drawFood();
    drawSnake();
    drawScore();
}

document.addEventListener("keypress", (event) => {
    if(event.code == "KeyA" && snakedir != 2){
        snakedir = 3;
    } else if(event.code == "KeyS" && snakedir != 0){
        snakedir = 1;
    } else if(event.code == "KeyD" && snakedir != 3){
        snakedir = 2;
    } else if(event.code == "KeyW" && snakedir != 1){
        snakedir = 0;
    }
})

function resetgame(){
    if(score > highScore){
        highscore = score;
        let leaderboard = document.getElementById("highscore");
        leaderboard.innerText = "High Score: " + highscore;
    }
    snakebod = [ {x:0,y:0} ];
    snakedir = 1;
    snakeleng = 1;
    score = 0;
    acc = 0;
    RandomizeFoodloc();
    difficulty()
}

function drawScore(){
    let scoreBoard = document.getElementById("score");
    scoreBoard.innerHTML = "Score: " + score;
}

function clearGrid(){
    for(i = 0; i < gridH; i++){
        for(j = 0; j < gridW; j++){
            let gridSpace = document.getElementById(j + "," + i);
            gridSpace.innerText = "";
        }
    }
}

function difficulty(){
    modal.style.display = "block";
    const span = document.getElementsByClassName("close")[0];
    clearInterval(gameInterval);

    span.addEventListener("click", function() {
        modal.style.display = "none";
    });
}

function logout(){
    if(confirm("Are you sure you want to logout?")){
        window.location.replace("/index.html");
    }
}

function back(){
    window.location.replace("/html/mainMenu.html");
}