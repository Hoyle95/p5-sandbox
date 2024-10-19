let ballSize, 
    ballX, 
    ballY,
    ballSpeedX,
    ballSpeedY;

function setup() {
    createCanvas(windowWidth,windowHeight);
    ballSize = 50;
    ballX = random(ballSize/2,width-ballSize/2);
    ballY = random(ballSize/2,height-ballSize/2);
    ballSpeedX = 10;
    ballSpeedY = 10;
}

function draw() {
    //clear canvas
    noStroke();
    fill(0, 50);
    rect(0,0,width,height);

    //draw ball
    fill(255);
    circle(ballX, ballY, ballSize);

    //update position
    ballX+= ballSpeedX;
    ballY+= ballSpeedY;

    //screen collision
    if (ballX < 0+(ballSize/2) || ballX > width-(ballSize/2)) {
        ballSpeedX*= -1;
    }
    if (ballY < 0+(ballSize/2) || ballY > height-(ballSize/2)) {
        ballSpeedY*= -1;
    }
}