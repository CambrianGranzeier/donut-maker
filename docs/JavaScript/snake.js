// Variables
let snakeBody = [ {x:0,y:1} ];
let snakeDir = 1; // 0,1,2,3 ... N,S,E,W
let snakeLen = 2;
// NOTE: add a display text for our snake's direction
let score = 0;
let highscore = 0;

let foodPosn = {x: 5, y: 3} // foodposn is an object with properties x and y

// one idea: we'll put the snake in each of the grid spots
// NOTE: revisit + refactor this
const gridHeight = 20;
const gridWidth = 50;
// DOM Manipulation
let gridHTML = document.getElementById("grid");
gridHTML.style.gridTemplateColumns = "repeat(" + gridWidth + ", 20px)";
gridHTML.style.gridTemplateRows = "repeat(" + gridHeight + ", 20px)";
for(let i = 0; i < gridHeight; i++){
    for(let j = 0; j < gridWidth; j++){
        // grid.push({x:j, y:i } )
        let gridSpaceHTML = document.createElement("div"); // this HTML item represents a space on our grid
        gridSpaceHTML.id = j + "," + i; // gives the space an id of 'j,i'
        gridSpaceHTML.classList.add("grid-item");
        gridHTML.append(gridSpaceHTML); 
    }
}

// Functions
function DrawFood(){
    // grab the html element where our food is located
    let foodSpaceHTML = document.getElementById(foodPosn.x + "," + foodPosn.y);
    // update its visuals
    foodSpaceHTML.innerHTML = `<img id="donut" src="/images/favicon-16x16.png" alt="a donut">`;
    // done.
}
RandomizeFoodPosn();
DrawFood();

function DrawSnake(){
    for(let i = 0; i < snakeBody.length; i++){
        let snakeSpaceHTML = document.getElementById(snakeBody[i].x + "," + snakeBody[i].y);
        // update its visuals

        snakeSpaceHTML.innerText = i == 0 ? "💀" : "🎃";
    }

}
DrawSnake();

// creates a random position from 0,0 to 9,9
function RandomizeFoodPosn(){
    foodPosn.x = Math.floor(Math.random() * gridWidth);
    foodPosn.y = Math.floor(Math.random() * gridHeight);
}

function MoveSnake(){
    // create a new head for our snake
    let newSnakeHead = {x:false, y:false}
    switch(snakeDir){
        case 0: // NORTH
            newSnakeHead.x = snakeBody[0].x;
            newSnakeHead.y = snakeBody[0].y - 1;
            break;
        case 1: // SOUTH
            newSnakeHead.x = snakeBody[0].x;
            newSnakeHead.y = snakeBody[0].y + 1;
            break;
        case 2: // EAST
            newSnakeHead.x = snakeBody[0].x + 1;
            newSnakeHead.y = snakeBody[0].y;
            break;
        case 3: // WEST
            newSnakeHead.x = snakeBody[0].x - 1;
            newSnakeHead.y = snakeBody[0].y;
            break;
    }
    // handle the case when our snake goes off the board.
    if(newSnakeHead.x < 0){
        newSnakeHead.x += gridWidth;
    }
    if(newSnakeHead.y < 0){
        newSnakeHead.y += gridHeight;
    }
    // wrap around.
    newSnakeHead.x = newSnakeHead.x % gridWidth;
    newSnakeHead.y = newSnakeHead.y % gridHeight;
    // add the new head to our body
    snakeBody.unshift(newSnakeHead);
    //console.log(snakeBody);
    // check if fruit coordinate exists on our snake
    let grow = false;
    for(let i = 0; i < snakeBody.length; i++){
        grow = snakeBody[i].x == foodPosn.x && snakeBody[i].y == foodPosn.y
        if(grow){ //grow is true, break out of the loop
            clearInterval(gameInterval);
            gameInterval = setInterval(PlayGame, 200 - (score));
            snakeLen++;
            score++;
            RandomizeFoodPosn();
            break;
        }
    }
    if(!grow){
        //remove our tail*
        snakeBody.pop(); // removes the last item from our array
    }
    // check if newsnakehead already exists on our snake
    let die = false;
    for(let i = 1; i < snakeBody.length; i++){
        die = snakeBody[i].x == newSnakeHead.x && snakeBody[i].y == newSnakeHead.y
        //console.log(die);
        if(die){ //grow is true, break out of the loop
            break;
        }
    }
    if(die){
        ResetGame();
    }
}
// need a way to run this over time
function PlayGame(){
    // update our logic
    MoveSnake();
    // draw our game
    ClearGrid();
    DrawFood();
    DrawSnake();
    DrawScore();
}

// Intervals
// intervals are timers. they run functions every few milliseconds
// if we set multiple timers, code will run multiple times
// in order to stop a timer, we use the clearInterval() method
// in order to create a timer, we use the setIntverval() method
// with set interval, we specify how many milliseconds in between each run and the function to run
let gameInterval = setInterval(PlayGame, 200);



// need a way to change directions
document.addEventListener("keypress", (event) => {
    if(event.code == "KeyA" && snakeDir != 2){
        snakeDir = 3;
    }
    else if(event.code == "KeyW" && snakeDir != 1){
        snakeDir = 0;
    }
    else if(event.code == "KeyS" && snakeDir != 0){
        snakeDir = 1;
    }
    else if(event.code == "KeyD" && snakeDir != 3){
        snakeDir = 2;
    }
});

// die / reset game function
function ResetGame(){
    if(score > highscore){
        highscore = score; // this updates our high score if we beat it
        let leaderboard = document.getElementById("highscore"); // grabs our score element
        leaderboard.innerText = "High Score: " + highscore;
    }
    snakeBody = [ {x:0,y:0} ];
    snakeDir = 1; // 0,1,2,3 ... N,S,E,W
    snakeLen = 1;
    score = 0;
    RandomizeFoodPosn();
    clearInterval(gameInterval);
    gameInterval = setInterval(PlayGame, 200);
}

function DrawScore(){
    // fill in later
    let scoreboard = document.getElementById("score"); // grabs our score element
    scoreboard.innerText = "Score: " + score;
}

function ClearGrid(){
    for(let i = 0; i < gridHeight; i++){
        for(let j = 0; j < gridWidth; j++){
            let gridSpaceHTML = document.getElementById( j + "," + i);
            gridSpaceHTML.innerText = "";
        }
    }
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