let canvas = document.getElementById('frogger-canvas');
let ctx = canvas.getContext('2d');
let frog = {x: 200, y: 380, width: 20, height: 20};
let cars = [];
let logs = [];
let score = 0;

for (let i = 0; i < 5; i++) {
    cars.push({x: Math.random() * 400, y: i * 80 + 100, width: 50, height: 20, speed: Math.random() * 2 + 1});
}

for (let i = 0; i < 5; i++) {
    logs.push({x: Math.random() * 400, y: i * 80 + 20, width: 100, height: 20, speed: Math.random() * 2 + 1});
}

function drawFrog() {
    ctx.fillStyle = 'green';
    ctx.fillRect(frog.x, frog.y, frog.width, frog.height);
}

function drawCars() {
    for (let i = 0; i < cars.length; i++) {
        ctx.fillStyle = 'red';
        ctx.fillRect(cars[i].x, cars[i].y, cars[i].width, cars[i].height);
    }
}

function drawLogs() {
    for (let i = 0; i < logs.length; i++) {
        ctx.fillStyle = 'brown';
        ctx.fillRect(logs[i].x, logs[i].y, logs[i].width, logs[i].height);
    }
}

function updateCars() {
    for (let i = 0; i < cars.length; i++) {
        cars[i].x += cars[i].speed;
        if (cars[i].x > 400) {
            cars[i].x = -cars[i].width;
        }
    }
}

function updateLogs() {
    for (let i = 0; i < logs.length; i++) {
        logs[i].x += logs[i].speed;
        if (logs[i].x > 400) {
            logs[i].x = -logs[i].width;
        }
    }
}

function checkCollisions() {
    for (let i = 0; i < cars.length; i++) {
        if (frog.x + frog.width > cars[i].x && frog.x < cars[i].x + cars[i].width && frog.y + frog.height > cars[i].y && frog.y < cars[i].y + cars[i].height) {
            alert('Game Over!');
            clearInterval(gameInterval);
        }
    }
    for (let i = 0; i < logs.length; i++) {
        if (frog.x + frog.width > logs[i].x && frog.x < logs[i].x + logs[i].width && frog.y + frog.height > logs[i].y && frog.y < logs[i].y + logs[i].height) {
            frog.x += logs[i].speed;
        }
    }
}

function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Score: ' + score, 10, 10);
}

let gameInterval = setInterval(() => {
    clearCanvas();
    updateCars();
    updateLogs();
    checkCollisions();
    drawFrog();
    drawCars();
    drawLogs();
    drawScore();
}, 16);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        frog.y -= 20;
    } else if (e.key === 'ArrowDown') {
        frog.y += 20;
    } else if (e.key === 'ArrowLeft') {
        frog.x -= 20;
    } else if (e.key === 'ArrowRight') {
        frog.x += 20;
    }
    if (frog.y < 20) {
        score++;
        frog.y = 380;
    }
});
