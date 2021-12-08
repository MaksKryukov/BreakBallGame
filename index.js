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

let num = 0;

var topScore = 0;
let newName = "";
let nickNames = ["", "", "", "", ""];
let allScore = [0, 0, 0, 0, 0];
let min = allScore[0];

const defaultLevel1BlockPoints = [
  { x: 3, y: 2 },
  { x: 4, y: 2 },
  { x: 5, y: 2 },
  { x: 6, y: 2 },
  { x: 7, y: 2 },
  { x: 8, y: 2 },
  { x: 9, y: 2 },
  { x: 10, y: 2 },
  { x: 11, y: 2 },
  { x: 12, y: 2 },
  { x: 13, y: 2 },
  { x: 14, y: 2 },
  { x: 15, y: 2 },
  { x: 16, y: 2 },
  { x: 17, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 3 },
  { x: 5, y: 3 },
  { x: 6, y: 3 },
  { x: 7, y: 3 },
  { x: 8, y: 3 },
  { x: 9, y: 3 },
  { x: 10, y: 3 },
  { x: 11, y: 3 },
  { x: 12, y: 3 },
  { x: 13, y: 3 },
  { x: 14, y: 3 },
  { x: 15, y: 3 },
  { x: 16, y: 3 },
  { x: 17, y: 3 },
  { x: 3, y: 4 },
  { x: 4, y: 4 },
  { x: 5, y: 4 },
  { x: 6, y: 4 },
  { x: 7, y: 4 },
  { x: 8, y: 4 },
  { x: 9, y: 4 },
  { x: 10, y: 4 },
  { x: 11, y: 4 },
  { x: 12, y: 4 },
  { x: 13, y: 4 },
  { x: 14, y: 4 },
  { x: 15, y: 4 },
  { x: 16, y: 4 },
  { x: 17, y: 4 },
  { x: 3, y: 5 },
  { x: 4, y: 5 },
  { x: 5, y: 5 },
  { x: 6, y: 5 },
  { x: 7, y: 5 },
  { x: 8, y: 5 },
  { x: 9, y: 5 },
  { x: 10, y: 5 },
  { x: 11, y: 5 },
  { x: 12, y: 5 },
  { x: 13, y: 5 },
  { x: 14, y: 5 },
  { x: 15, y: 5 },
  { x: 16, y: 5 },
  { x: 17, y: 5 },
  { x: 3, y: 6 },
  { x: 4, y: 6 },
  { x: 5, y: 6 },
  { x: 6, y: 6 },
  { x: 7, y: 6 },
  { x: 8, y: 6 },
  { x: 9, y: 6 },
  { x: 10, y: 6 },
  { x: 11, y: 6 },
  { x: 12, y: 6 },
  { x: 13, y: 6 },
  { x: 14, y: 6 },
  { x: 15, y: 6 },
  { x: 16, y: 6 },
  { x: 17, y: 6 },
];

let blockPoints = defaultLevel1BlockPoints.slice();

let ball = {
  x: 10,
  y: 18,
}

let platformPoints = [
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

  if (e.keyCode === 37) {
    dir = "left";
  }

  else if (e.keyCode === 39) {
    dir = "right";
  }
  else { dir = "notMoving" }
  if (isBallMoving === false) {
    if (e.keyCode === 32) {
      isBallMoving = true;
      ballDir = "topRight";
      document.getElementById('startText').classList.add('hidden')
    }
  }

}

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

  const highscoreGameButtonElement = document.getElementById('game-score-btn');

  highscoreGameButtonElement.addEventListener('click', () => {
    pages.index.classList.add('hidden');
    pages.game.classList.add('hidden');
    pages.highscore.classList.remove('hidden');
    restart();
    namingThePLayer();
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
    restart()
  })

  const gameButtonElement = document.getElementById('play-btn');

  gameButtonElement.addEventListener('click', () => {
    pages.index.classList.add('hidden');
    pages.game.classList.remove('hidden');
    pages.highscore.classList.add('hidden');
    isGameActive = true;
    gameZone();
    blockPoints = []; //defaultLevel1BlockPoints.slice();
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

function restart() {
  clearBall();
  clearPlatform();
  removeBlocks();
  document.getElementById('gameOverText').classList.add('hidden');
  document.getElementById('startText').classList.remove('hidden');
  document.getElementById('game-score-btn').classList.add('hidden');
  document.getElementById('game-menu-btn').classList.remove('hidden');
  isGameOver = false;
  score = 0;
  ball = {
    x: 10,
    y: 18,
  }
  platformPoints = [
    { x: 8, y: 19 },
    { x: 9, y: 19 },
    { x: 10, y: 19 },
    { x: 11, y: 19 },
    { x: 12, y: 19 },
  ];
  blockPoints = [
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 5, y: 2 },
    { x: 6, y: 2 },
    { x: 7, y: 2 },
    { x: 8, y: 2 },
    { x: 9, y: 2 },
    { x: 10, y: 2 },
    { x: 11, y: 2 },
    { x: 12, y: 2 },
    { x: 13, y: 2 },
    { x: 14, y: 2 },
    { x: 15, y: 2 },
    { x: 16, y: 2 },
    { x: 17, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 3 },
    { x: 5, y: 3 },
    { x: 6, y: 3 },
    { x: 7, y: 3 },
    { x: 8, y: 3 },
    { x: 9, y: 3 },
    { x: 10, y: 3 },
    { x: 11, y: 3 },
    { x: 12, y: 3 },
    { x: 13, y: 3 },
    { x: 14, y: 3 },
    { x: 15, y: 3 },
    { x: 16, y: 3 },
    { x: 17, y: 3 },
    { x: 3, y: 4 },
    { x: 4, y: 4 },
    { x: 5, y: 4 },
    { x: 6, y: 4 },
    { x: 7, y: 4 },
    { x: 8, y: 4 },
    { x: 9, y: 4 },
    { x: 10, y: 4 },
    { x: 11, y: 4 },
    { x: 12, y: 4 },
    { x: 13, y: 4 },
    { x: 14, y: 4 },
    { x: 15, y: 4 },
    { x: 16, y: 4 },
    { x: 17, y: 4 },
    { x: 3, y: 5 },
    { x: 4, y: 5 },
    { x: 5, y: 5 },
    { x: 6, y: 5 },
    { x: 7, y: 5 },
    { x: 8, y: 5 },
    { x: 9, y: 5 },
    { x: 10, y: 5 },
    { x: 11, y: 5 },
    { x: 12, y: 5 },
    { x: 13, y: 5 },
    { x: 14, y: 5 },
    { x: 15, y: 5 },
    { x: 16, y: 5 },
    { x: 17, y: 5 },
    { x: 3, y: 6 },
    { x: 4, y: 6 },
    { x: 5, y: 6 },
    { x: 6, y: 6 },
    { x: 7, y: 6 },
    { x: 8, y: 6 },
    { x: 9, y: 6 },
    { x: 10, y: 6 },
    { x: 11, y: 6 },
    { x: 12, y: 6 },
    { x: 13, y: 6 },
    { x: 14, y: 6 },
    { x: 15, y: 6 },
    { x: 16, y: 6 },
    { x: 17, y: 6 },
  ]
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

function removeBlock(point) {
  document.getElementById(`${point.y} ${point.x}`).classList.remove('block');
}

function removeBlocks() {
  for (const point of blockPoints) {
    document.getElementById(`${point.y} ${point.x}`).classList.remove('block');
  }
}

function addBlock() {
  for (const point of blockPoints) {
    document.getElementById(`${point.y} ${point.x}`).classList.add('block');
  }
}

function namingThePLayer() {
  newName = prompt("Enter your name", "");
  nickNames[num] = newName;
  console.log(nickNames[num]);
}

function gameOver() {
  isBallMoving = false;
  isGameOver = true;
  isGameActive = false;
  document.getElementById('gameOverText').classList.remove('hidden');
  document.getElementById('game-score-btn').classList.remove('hidden');
  document.getElementById('game-menu-btn').classList.add('hidden');

  for (var i = 0; i < allScore.length; i++) {
    if (allScore[i] <= min) {
      allScore[i] = score;
      num = i;
      break;
    }
  }

  console.log(allScore[0]);
  console.log(allScore[1]);
  console.log(allScore[2]);
  console.log(allScore[3]);
  console.log(allScore[4]);
}

function bestScore() {
  for (var i = 0; i < allScore.length; i++) {
    if (allScore[i] > topScore) {
      topScore = allScore[i];
    } else if (score > topScore) {
      topScore = score;
    }
  }
}

function ballMove() {
  console.log('BALL COORDS',  ball);
  if (ballDir === "downRight") {
    ball.x++;
    ball.y++;
    if (ball.x === fieldWidth && ball.y === fieldWidth) gameOver();
    else if (ball.x === fieldWidth) ballDir = "downLeft";
    else if (platformPoints.some((point) => point.x === ball.x && point.y === ball.y)) {
      ballDir = "topRight";
      ball.x--;
      ball.y--;
    } else if (ball.y === fieldHeight) gameOver();
  }
  else if (ballDir === "topRight") {
    ball.x++;
    ball.y--;
    if (ball.x === fieldWidth && ball.y === 0) ballDir = "downLeft";
    else if (ball.x === fieldWidth) ballDir = "topLeft";
    else if (ball.y === 0) ballDir = "downRight";
  }
  else if (ballDir === "topLeft") {
    ball.x--;
    ball.y--;
    if (ball.x === 0 && ball.y === 0) ballDir = "downRight";
    else if (ball.x === 0) ballDir = "topRight";
    else if (ball.y === 0) ballDir = "downLeft";
  }
  else if (ballDir === "downLeft") {
    ball.x--;
    ball.y++;
    if (ball.x === 0 && ball.y === fieldWidth) gameOver();
    else if (ball.x === 0) ballDir = "downRight";
    else if (platformPoints.some((point) => point.x === ball.x && point.y === ball.y)) {
      ballDir = "topLeft";
      ball.x++;
      ball.y--;
    } else if (ball.y === fieldHeight) gameOver();
  }
  console.log('BALL COORDS AFTER CHANGE',  ball);
  if (ball.x < 0 || ball.y < 0) debugger;
}

function ballHitToBrick() {
  const brick = blockPoints.find((point) => point.x === ball.x && point.y === ball.y);
  console.log('@@@', brick);
  if (brick != null) {
    console.log('!!!!!!!1', blockPoints.length);
    const index = blockPoints.indexOf(brick);
    blockPoints.splice(index, 1);
    console.log('!!!!!!!2', blockPoints.length, index);
    const leftBrick = blockPoints.find((point) => point.x === brick.x - 1 && point.y === brick.y);
    const rightBrick = blockPoints.find((point) => point.x === brick.x + 1 && point.y === brick.y);
    const topBrick = blockPoints.find((point) => point.x === brick.x && point.y === brick.y - 1);
    const bottomBrick = blockPoints.find((point) => point.x === brick.x && point.y === brick.y + 1);
    console.log('around bricks', leftBrick, rightBrick, topBrick, bottomBrick);
    if (ballDir === "downRight") {
      ball.y--;
      ballDir === "topRight";
    } else if (ballDir === "topRight") {
      ball.x--;
      ballDir = "topLeft";
    } else if (ballDir === "topLeft") {
      ball.x++;
      ballDir = "topRight";
    } else if (ballDir === "downLeft") {
      ball.y--;
      ballDir = "topLeft";
    } else if (ballDir === "downRight" && rightBrick.x===ball.x) {
      ball.x--;
      ballDir === "downLeft";
    }
    removeBlock(brick);
    score++;
  }
}

function platformMove() {
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
  if (isGameOver === false) platformMove();
  if (isBallMoving === true) {
    ballMove();
    ballHitToBrick();
  }
  document.getElementById('topScore').innerHTML = topScore;
  document.getElementById('score').innerHTML = score;
  bestScore();
  renderPlatform();
  renderBall()
  document.getElementById('scoreBar1').innerHTML = allScore[0];
  document.getElementById('scoreBar2').innerHTML = allScore[1];
  document.getElementById('scoreBar3').innerHTML = allScore[2];
  document.getElementById('scoreBar4').innerHTML = allScore[3];
  document.getElementById('scoreBar5').innerHTML = allScore[4];
  if (isGameActive) setTimeout(game, timeToFrame);
}

