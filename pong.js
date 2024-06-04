let canvas = document.getElementById('pong-canvas');
let ctx = canvas.getContext('2d');
let ball = {x: 300, y: 200, vx: 4, vy: 4};
let playerPaddle = {x: 10, y: 200, width: 10, height: 100};
let computerPaddle = {x: 580, y: 200, width: 10, height: 100};
let playerScore = 0;
let computerScore = 0;

function drawBall() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
    ctx.fill();
}

function drawPaddle(paddle) {
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function updateBall() {
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.y < 0 || ball.y > 390) {
        ball.vy = -ball.vy;
    }
    if (ball.x < 0) {
        computerScore++;
        ball.x = 300;
        ball.y = 200;
        ball.vx = -ball.vx;
    } else if (ball.x > 590) {
        playerScore++;
        ball.x = 300;
        ball.y = 200;
        ball.vx = -ball.vx;
    }
    if (ball.x < 20 && ball.y > playerPaddle.y && ball.y < playerPaddle.y + playerPaddle.height) {
        ball.vx = -ball.vx;
    }
    if (ball.x > 570 && ball.y > computerPaddle.y && ball.y < computerPaddle.y + computerPaddle.height) {
        ball.vx = -ball.vx;
    }
}

function updateComputerPaddle() {
    if (computerPaddle.y + computerPaddle.height / 2 < ball.y) {
        computerPaddle.y += 4;
    } else if (computerPaddle.y + computerPaddle.height / 2 > ball.y) {
        computerPaddle.y -= 4;
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
    ctx.fillText('Player: ' + playerScore, 10, 10);
    ctx.textAlign = 'right';
    ctx.fillText('Computer: ' + computerScore, 590, 10);
}

let gameInterval = setInterval(() => {
    clearCanvas();
    updateBall();
    updateComputerPaddle();
    drawBall();
    drawPaddle(playerPaddle);
    drawPaddle(computerPaddle);
    drawScore();
}, 16);

document.addEventListener('mousemove', (e) => {
    playerPaddle.y = e.clientY - canvas.offsetTop - playerPaddle.height / 2;
});
