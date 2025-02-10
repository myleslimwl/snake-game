const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('resetBtn');
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
let foodX, foodY;
let score = 0;
let snake = [
  {x: unitSize * 4, y: 0},
  {x: unitSize * 3, y: 0},
  {x: unitSize * 2, y: 0},
  {x: unitSize, y: 0},
  {x: 0, y: 0}
]

addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

startGame();

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
    }, 1000);  
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
}

function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}