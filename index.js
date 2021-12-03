var isNotCreated = true;
var isGameActive = false;
var dir = "";
var isBallMoving = false;
const timeToFrame = 200;
var ballDir = "";
let ball = {
  x: 0,
  y: 0
}

let platform = {
  x: 0,
  y: 0
}
document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') main();
});

document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;

  if (e.keyCode === 37) {
    dir = "left";
  }

  else if (e.keyCode === 39) {
    dir = "right";
  }
  else { dir = "notMoving" }

  if(e.keyCode === 32 && !isBallMoving){
    ballDir = "topRight";
  }
}
/*
document.addEventListener('keydown', (e)=>{
if(e.keyCode===37) {dir="left";}
else if (e.keyCode===39 ) {dir="right";}
else{
    
}
})
*/
function main() {
  const pages = {
    index: document.getElementById('index-page'),
    highscore: document.getElementById('highscore-page'),
    game: document.getElementById('game-page'),
  };

  const highscoreButtonElement = document.getElementById('highscore-btn');

  highscoreButtonElement.addEventListener('click', () => {
    pages.index.classList.add('hidden');
    pages.game.classList.add('hidden');
    pages.highscore.classList.remove('hidden');
  })

  const menuButtonElement = document.getElementById('menu-btn');

  menuButtonElement.addEventListener('click', () => {
    pages.index.classList.remove('hidden');
    pages.game.classList.add('hidden');
    pages.highscore.classList.add('hidden');
  })

  const gameMenuButtonElement = document.getElementById('game-menu-btn');

  gameMenuButtonElement.addEventListener('click', () => {
    pages.index.classList.remove('hidden');
    pages.game.classList.add('hidden');
    pages.highscore.classList.add('hidden');
    isGameActive = false;
  })

  const gameButtonElement = document.getElementById('play-btn');

  gameButtonElement.addEventListener('click', () => {
    pages.index.classList.add('hidden');
    pages.game.classList.remove('hidden');
    pages.highscore.classList.add('hidden');
    isGameActive = true;
    gameZone();
    //addWall();
    setTimeout(game, timeToFrame);
  })

  function gameZone() {
    var div = document.getElementById('gameWindow');
    if (isNotCreated === true) {
      for (var i = 0; i < 21; i++) {
        for (var j = 0; j < 21; j++) {
          var newDiv = document.createElement('div');
          newDiv.id = `${i} ${j}`;
          newDiv.classList.add('areaBox');
          div.appendChild(newDiv);
          if (i === 20) {
            isNotCreated = false;
          }
        }
      }
    }
  }

}
/*
function addWall(){
  for(var i = 0; i < 21; i++){
    document.getElementById(0 + ' ' + `${i}`).classList.add('wall');
    document.getElementById(`${i}` + ' ' + 0).classList.add('wall');
    document.getElementById(`${i}` + ' ' + 20).classList.add('wall');
  }
}
*/

function addPlatform() {
  for (var i = 0; i < 20; i++) {
    document.getElementById(19 + ' ' + `${i}`).classList.remove('platform');
  }
  for (var i = platform.x + 8; i < platform.x + 13; i++) {
    document.getElementById(19 + ' ' + `${i}`).classList.add('platform');
  }

}

function addBall() {
  for (var i = 0; i < 20; i++){
    for(var j = 20; j > 0; j--){
      document.getElementById(`${j}`+ ' ' + `${i}`).classList.remove('ball');
    }
  }
  for (var i = ball.x + 18; i < ball.x + 19; i++){
    for(var j = ball.y + 10; j < ball.y + 11; j++){
      document.getElementById(`${i}`+ ' ' + `${j}`).classList.add('ball');
    }
  }
  
}

function addBlock() {
  for (var i = 2; i < 8; i++) {
    for (var j = 2; j < 19; j++) {
      document.getElementById(`${i}` + ' ' + `${j}`).classList.add('block');
    }
  }
}
/*
function ballCollision(){
  if(ball.x < 7 && ball.y <10 && ballDir ==="topRight"){
    ballDir="topLeft";
  } else if(ball.x > -7 && ball.y <10 && ballDir ==="topLeft"){
    ballDir="downLeft";
  } 
  else if(ball.x > -7 && ball.y >-10 && ballDir ==="downLeft"){
    ballDir="downRight";
  }
  else if(ball.x < 7 && ball.y >-10 && ballDir ==="downRight"){
    ballDir="topRight"
  }
 
}
*/
function ballMove(){
  if (ballDir === "downRight" && ball.x < 7 ) {ball.x++; ball.y++;}
  else if (ballDir === "topRight" && ball.x < 7 ) {ball.x--; ball.y++;}
  else if (ballDir === "topLeft" && ball.x > -7 ) {ball.x--; ball.y--;}
  else if (ballDir === "downLeft" && ball.x > -7) {ball.x++; ball.y--;}
  
}

function action() {
  if (dir === "right" && platform.x < 7) platform.x++;
  else if (dir === "left" && platform.x > -7) platform.x--;
  dir = "notMoving";
}

function game() {
  //ballCollision()
  addPlatform()
  addBall();
  addBlock();
  action();
  ballMove();
  if (isGameActive) setTimeout(game, timeToFrame);
}

