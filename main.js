const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game constants
const bubbleRadius = 20;
const shooterWidth = 40;
const shooterHeight = 20;
const shooterSpeed = 5;
const bubbleSpeed = 2;
const bubbleCount = 20;

let shooterX = canvas.width / 2 - shooterWidth / 2;
let bubbles = [];

// Create random bubbles
for (let i = 0; i < bubbleCount; i++) {
    bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: bubbleRadius,
        color: "blue",
    });
}

function drawShooter() {
    ctx.fillStyle = "red";
    ctx.fillRect(shooterX, canvas.height - shooterHeight, shooterWidth, shooterHeight);
}

function drawBubble(bubble) {
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
    ctx.fillStyle = bubble.color;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const bubble of bubbles) {
        drawBubble(bubble);
        bubble.y += bubbleSpeed;

        // Check for collision with shooter
        if (
            bubble.x >= shooterX &&
            bubble.x <= shooterX + shooterWidth &&
            bubble.y >= canvas.height - shooterHeight
        ) {
            bubbles = []; // Clear bubbles
            // Create a new set of bubbles
            for (let i = 0; i < bubbleCount; i++) {
                bubbles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: bubbleRadius,
                    color: "blue",
                });
            }
        }

        // Remove bubbles that go off the screen
        if (bubble.y > canvas.height) {
            bubbles.splice(bubbles.indexOf(bubble), 1);
        }
    }

    drawShooter();

    requestAnimationFrame(draw);
}

function moveShooter(event) {
    if (event.key === "ArrowLeft" && shooterX > 0) {
        shooterX -= shooterSpeed;
    } else if (event.key === "ArrowRight" && shooterX < canvas.width - shooterWidth) {
        shooterX += shooterSpeed;
    }
}

document.addEventListener("keydown", moveShooter);

draw();
