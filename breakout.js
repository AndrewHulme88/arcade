let canvas = document.getElementById('breakout-canvas');
let ctx = canvas.getContext('2d');
let ball = {x: 300, y: 200, vx: 2, vy: 2};
let paddle = {x: 250, y: 350, width: 100, height: 20};
let bricks = [];
let score = 0;

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 8; j++) {
        bricks.push({x: j * 70 + 35, y: i * 30 + 35, width: 60, height: 20, exists: true});
    }
}

function drawBall() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
    ctx.fill();
}

function drawPaddle() {
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBricks() {
    for (let i = 0; i < bricks.length; i++) {
        if (bricks[i].exists) {
            ctx.fillStyle = 'white';
            ctx.fillRect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height);
        }
    }
}

function updateBall() {
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.y < 0) {
        ball.vy = -ball.vy;
    }
    if (ball.x < 0 || ball.x > 590) {
        ball.vx = -ball.vx;
    }
    if (ball.y > 390) {
        ball.x = 300;
        ball.y = 200;
        ball.vx = 2;
        ball.vy = 2;
    }
    if (ball.y + ball.vy > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.vy = -ball.vy;
    }
    for (let i = 0; i < bricks.length; i++) {
        if (bricks[i].exists && ball.x > bricks[i].x && ball.x < bricks[i].x + bricks[i].width && ball.y > bricks[i].y && ball.y < bricks[i].y + bricks[i].height) {
            ball.vy = -ball.vy;
            bricks[i].exists = false;
            score++;
        }
    }
}

function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 600, 400);
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
    updateBall();
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
}, 16);

document.addEventListener('mousemove', (e) => {
    paddle.x = e.clientX - canvas.offsetLeft - paddle.width / 2;
});
