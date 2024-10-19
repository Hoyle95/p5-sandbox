let ballSize, 
    ballX, 
    ballY,
    ballSpeedX,
    ballSpeedY,
    bg;

function setup() {
    createCanvas(windowWidth,windowHeight);
    ballSize = 50;
    ballX = random(ballSize/2,width-ballSize/2);
    ballY = random(ballSize/2,height-ballSize/2);
    ballSpeedX = 10;
    ballSpeedY = 10;
    bg = {r: 0, g: 0, b: 0};
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
    circle(ballX, ballY, ballSize);

    ballX+= ballSpeedX;
    ballY+= ballSpeedY;

    if (ballX < 0+(ballSize/2) || ballX > width-(ballSize/2)) {
        ballSpeedX*= -1;
        randomBG();
    }

    if (ballY < 0+(ballSize/2) || ballY > height-(ballSize/2)) {
        ballSpeedY*= -1;
        randomBG();
    }
}

function randomBG() {
    bg.r = random(255);
    bg.g = random(255);
    bg.b = random(255);
}