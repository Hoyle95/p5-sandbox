let ballSize, 
    ballX, 
    ballY,
    ballSpeedX,
    ballSpeedY;

function setup() {
    createCanvas(windowWidth,windowHeight);
    ballSize = 50;
    ballX = width/2;
    ballY = height/2;
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
    //right
    if (ballX > width-(ballSize/2)) {
        ballSpeedX*= -1;
    }
    //left
    if (ballX < 0+(ballSize/2)) {
        ballSpeedX*= -1;
    }
    //top
    if (ballY < 0+(ballSize/2)) {
        ballSpeedY*= -1;
    }
    //bottom
    if (ballY > height-(ballSize/2)) {
        ballSpeedY*= -1;
    }
}