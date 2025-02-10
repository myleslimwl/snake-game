const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";  
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX; 
let foodY;
let score = 0;
let snake = [
  {x: unitSize * 4, y: 0},
  {x: unitSize * 3, y: 0},
  {x: unitSize * 2, y: 0},
  {x: unitSize, y: 0},
  {x: 0, y: 0}
];

addEventListener('keydown', changeDirection);
resetBtn.addEventListener("click", resetGame);

startGame();
createFood();
drawFood();

function startGame() {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}

function nextTick() {
  if(running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75);  
  }
  else {
    displayGameOver();
  }
}

function createFood() {
  function randomFood(min, max) {
    const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitSize);  
  foodY = randomFood(0, gameWidth - unitSize);
  console.log(foodX);
}

function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function moveSnake() {
  const headX = snake[0].x + xVelocity;
  const headY = snake[0].y + yVelocity;
  snake.unshift({x: headX, y: headY});
  if(headX === foodX && headY === foodY) {
    score++;
    scoreText.textContent = score;
    createFood();
  }
  else {
    snake.pop();
  }
}

function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach(snakePart => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  })
}

function changeDirection(e) {
  if(e.key === 'ArrowUp' && yVelocity === 0) {
    yVelocity = -unitSize;
    xVelocity = 0;
  }
  else if(e.key === 'ArrowDown' && yVelocity === 0) {
    yVelocity = unitSize;
    xVelocity = 0;
  }
  else if(e.key === 'ArrowLeft' && xVelocity === 0) {
    xVelocity = -unitSize;
    yVelocity = 0;
  }
  else if(e.key === 'ArrowRight' && xVelocity === 0) {
    xVelocity = unitSize;
    yVelocity = 0;
  }
} 

function checkGameOver() {
  switch(true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
    default:
      break;
  }
  for(let i =1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      running = false;
    }
  }
}

function displayGameOver() {  
  ctx.font = "50px Arial";  
  ctx.fillStyle = "black"; 
  ctx.textAlign = "center";           
  ctx.fillText("Game Over!", gameWidth / 2, gameHeight / 2);
}

function resetGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
  ];
  startGame();
}