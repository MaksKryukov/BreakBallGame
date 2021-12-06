var isNotCreated = true;
var isGameActive = false;
var isBallMoving = false;
let isGameOver = false;

var ballDir = "";
var dir = "";

const fieldWidth = 20;
const fieldHeight = 20;

const timeToFrame = 200;

var score = 0;
document.getElementById('score').innerHTML = score;
var topScore = 0;
document.getElementById('topScore').innerHTML = topScore;

let block = {
  x: 0,
  y: 0
}

let ball = {
  x: 9,
  y: 18,
}

let platform = {
  x: 0,
  y: 0
}

const platformPoints = [
  { x: 8, y: 19 },
  { x: 9, y: 19 },
  { x: 10, y: 19 },
  { x: 11, y: 19 },
  { x: 12, y: 19 },
];

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') main();
});

document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;

  if (e.keyCode === 37 ) {
    dir = "left";
  }

  else if (e.keyCode === 39) {
    dir = "right";
  }
  else { dir = "notMoving" }

  if (e.keyCode === 32) {
    isBallMoving = true;
    ballDir = "topRight";
    document.getElementById('startText').classList.add('hidden')
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

function clearPlatform() {
  for (const point of platformPoints) {
    document.getElementById(`${point.y} ${point.x}`).classList.remove('platform');
  }

}

function renderPlatform() {
  for (const point of platformPoints) {
    document.getElementById(`${point.y} ${point.x}`).classList.add('platform');
  }
}

function clearBall() {
  document.getElementById(`${ball.y}` + ' ' + `${ball.x}`).classList.remove('ball');
}

function renderBall() {
  document.getElementById(`${ball.y}` + ' ' + `${ball.x}`).classList.add('ball');
}

function addBlock() {
  for (var i = block.y + 2; i < block.y + 8; i++) {
    for (var j = block.x + 2; j < block.x + 19; j++) {
      document.getElementById(`${i}` + ' ' + `${j}`).classList.add('block');
    }
  }
}

function ballMove() {
  if (ballDir === "downRight") {
    ball.x++;
    ball.y++;
    if (ball.x === fieldWidth) ballDir = "downLeft";
    else if (platformPoints.some((point) => point.x === ball.x && point.y === ball.y)) {
      ballDir = "topRight";
      ball.x--;
      ball.y--;
    } else if (ball.y === fieldHeight) //alert('GAME_OVER') ;
      isBallMoving = false;
  }
  else if (ballDir === "topRight") {
    ball.x++;
    ball.y--;
    if (ball.x === fieldWidth) ballDir = "topLeft";
    else if (ball.y === 0) ballDir = "downRight";
  }
  else if (ballDir === "topLeft") {
    ball.x--;
    ball.y--;
    if (ball.x === 0) ballDir = "topRight";
    else if (ball.y === 0) ballDir = "downLeft";
  }
  else if (ballDir === "downLeft") {
    ball.x--;
    ball.y++;
    if (ball.x === 0) ballDir = "downRight";
    else if (platformPoints.some((point) => point.x === ball.x && point.y === ball.y)) {
      ballDir = "topLeft";
      ball.x++;
      ball.y--;
    } else if (ball.y === fieldHeight) //alert('GAME_OVER');
      isBallMoving = false;
  }
  console.log(ball);
}

function action() {
  if (dir === "right" && platformPoints[4].x < fieldWidth) {
    for (const point of platformPoints) {
      point.x += 1;
    }
    if (isBallMoving === false) ball.x += 1;
  } else if (dir === "left" && platformPoints[0].x > 0) {
    for (const point of platformPoints) {
      point.x -= 1;
    }
    if (isBallMoving === false) ball.x -= 1;
  }

  dir = "notMoving";
}

function game() {

  clearPlatform();
  clearBall();
  addBlock();
  if (isGameOver === false) action();
  if (isBallMoving === true) ballMove();
  renderPlatform();
  renderBall();
  if (isGameActive) setTimeout(game, timeToFrame);
}

