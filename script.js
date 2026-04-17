const board = document.querySelector('.board');
const gap = 2;
const blockSize = 50;

const blocks = [];
const snake = [{ x: 1, y: 3 }];

let direction = 'right'; // ✅ start moving right so it doesn't go out of bounds immediately

const cols = Math.floor((board.clientWidth + gap) / (blockSize + gap));
const rows = Math.floor((board.clientHeight + gap) / (blockSize + gap));

board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        block.innerText = `${row}-${col}`;
        blocks[`${row}-${col}`] = block;
    }
}

function renderSnake() {
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add('fill');
    });
}

setInterval(() => {
    let head; // ✅ use let, not const

    if (direction === 'left')  head = { x: snake[0].x, y: snake[0].y - 1 };
    if (direction === 'right') head = { x: snake[0].x, y: snake[0].y + 1 };
    if (direction === 'up')    head = { x: snake[0].x - 1, y: snake[0].y };
    if (direction === 'down')  head = { x: snake[0].x + 1, y: snake[0].y };

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
    });

    snake.unshift(head);
    snake.pop();

    renderSnake();
}, 500);