let bg = {
    r: 0,
    g: 0,
    b: 0
}

let ball = {
    size: 50,
    x: 0,
    y: 0,
    speedX: 10,
    speedY: 10
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    ball.x = random(ball.size/2,width-ball.size/2);
    ball.y = random(ball.size/2,height-ball.size/2);
}

function draw() {
    noStroke();
    fill(bg.r, bg.g, bg.b);
    rect(0,0,width,height);

    if (mouseIsPressed) {
        fill(0,0,0);
        rect(0,0,width,height);
    }

    fill(255);
    circle(ball.x, ball.y, ball.size);

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.x < 0+(ball.size/2) || ball.x > width-(ball.size/2)) {
        ball.speedX*= -1;
        randomBG();
    }

    if (ball.y < 0+(ball.size/2) || ball.y > height-(ball.size/2)) {
        ball.speedY*= -1;
        randomBG();
    }
}

function randomBG() {
    bg.r = random(255);
    bg.g = random(255);
    bg.b = random(255);
}

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
    ball.x = random(ball.size/2,width-ball.size/2);
    ball.y = random(ball.size/2,height-ball.size/2);
}