const board = document.querySelector('.board');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.high-score');
const timeEl = document.querySelector('.time');
const cols = 20;
const rows = 20;
const blocks = {};
let snake = [{ x: 10, y: 10 }];
let dir = { x: 0, y: -1 };
let food = { x: 15, y: 15 };
let score = 0;
let highScore = Number(localStorage.getItem('snake-high')) || 0;
let seconds = 0;
let timerId;
let timeId;

board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const block = document.createElement('div');
    block.className = 'block';
    board.appendChild(block);
    blocks[`${x}-${y}`] = block;
  }
}

function placeFood() {
  do {
    food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  } while (snake.some(s => s.x === food.x && s.y === food.y));
}

function render() {
  Object.values(blocks).forEach(b => (b.className = 'block'));
  snake.forEach((segment, index) => {
    blocks[`${segment.x}-${segment.y}`].classList.add(index === 0 ? 'head' : 'fill');
  });
  blocks[`${food.x}-${food.y}`].classList.add('food');
  scoreEl.textContent = score;
  highScoreEl.textContent = highScore;
  timeEl.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}-${String(seconds % 60).padStart(2, '0')}`;
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  dir = { x: 0, y: -1 };
  score = 0;
  seconds = 0;
  placeFood();
  render();
}

function gameOver() {
  clearInterval(timerId);
  clearInterval(timeId);
  alert('Game over! Press OK to restart.');
//   start();
}

function step() {
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
  if (
    head.x < 0 ||
    head.x >= cols ||
    head.y < 0 ||
    head.y >= rows ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    return gameOver();
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('snake-high', highScore);
    }
    placeFood();
  } else {
    snake.pop();
  }
  render();
}

function start() {
  clearInterval(timerId);
  clearInterval(timeId);
  resetGame();
  timerId = setInterval(step, 120);
  timeId = setInterval(() => seconds++, 1000);
}

window.addEventListener('keydown', event => {
  const key = event.key;
  const next = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    w: { x: 0, y: -1 },
    s: { x: 0, y: 1 },
    a: { x: -1, y: 0 },
    d: { x: 1, y: 0 },
    W: { x: 0, y: -1 },
    S: { x: 0, y: 1 },
    A: { x: -1, y: 0 },
    D: { x: 1, y: 0 },
  }[key];

  if (next && (next.x !== -dir.x || next.y !== -dir.y)) {
    event.preventDefault();
    dir = next;
  }

  if (key === ' ') {
    event.preventDefault();
    start();
  }
});

start();