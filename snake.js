let canvas = document.getElementById('snake-canvas');
let ctx = canvas.getContext('2d');
let snake = [{x: 200, y: 200}, {x: 190, y: 200}, {x: 180, y: 200}, {x: 170, y: 200}];
let direction = 'right';
let food = {x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10};

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

function updateSnake() {
    let head = snake[0];
    let newHead = {x: head.x, y: head.y};
    if (direction === 'right') {
        newHead.x += 10;
    } else if (direction === 'left') {
        newHead.x -= 10;
    } else if (direction === 'up') {
        newHead.y -= 10;
    } else if (direction === 'down') {
        newHead.y += 10;
    }
    snake.unshift(newHead);
    if (snake[0].x === food.x && snake[0].y === food.y) {
        food = {x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10};
    } else {
        snake.pop();
    }
}

function checkCollision() {
    let head = snake[0];
    if (head.x < 0 || head.x > 390 || head.y < 0 || head.y > 390) {
        alert('Game Over!');
        clearInterval(gameInterval);
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert('Game Over!');
            clearInterval(gameInterval);
        }
    }
}

function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);
}

let gameInterval = setInterval(() => {
    clearCanvas();
    updateSnake();
    checkCollision();
    drawSnake();
    drawFood();
}, 100);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    } else if (e.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    } else if (e.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (e.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    }
});
