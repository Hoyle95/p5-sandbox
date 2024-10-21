let bubbles = [],
    numberOfBubbles = 0,
    bubblesPopped = 0,
    maxBubbles = 1000,
    musicEnabled = true,
    backgroundSong,
    pop,
    roundStarted = false;

function drawTiles(tileSize) {
    for (let y = 0; y < height; y += tileSize) {
        for (let x = 0; x < width; x += tileSize) {
            fill(240);
            stroke(100);
            rect(x, y, tileSize, tileSize);
        }
    }
}

function preload() {
    muteButton = loadImage('/p5-sandbox/bubbles/images/mute.png');
    backgroundSong = loadSound('/p5-sandbox/bubbles/sound/burning_purple.wav');
    pop = loadSound('/p5-sandbox/bubbles/sound/pop.wav');
}

function setup() {
    createCanvas(windowWidth,windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}

function mouseClicked() {
    if (!roundStarted) {
        roundStarted = true;
    }

    for (let i = 0; i < bubbles.length; i++) {
        if (bubbles[i].mouseColiding()) {
            numberOfBubbles--;
            bubbles.splice(i,1);
            pop.play();
            bubblesPopped++;
        }
    }

    if (mouseX > width - 70 && mouseX < width - 20 && mouseY > height - 70 && mouseY < height - 20) {
        musicEnabled = !musicEnabled;

        if (!musicEnabled) {
            backgroundSong.stop();
        }
    }
}

function draw() {
    drawTiles(100);

    if (roundStarted) {
        for (let bubble of bubbles) {
            bubble.draw();
        }

        if (random(0,1) < 0.02 && numberOfBubbles < maxBubbles) {
            numberOfBubbles++;
            bubbles.push(new Bubble());
        }

        noStroke();
        fill(250, 100, 150);
        textSize(40);

        textAlign(LEFT);
        text(`Bubbles ${numberOfBubbles}`, 20, 50);

        textAlign(RIGHT);
        text(`${bubblesPopped} Popped`, width - 20, 50);

        noFill();
        stroke(0);
        image(muteButton, width - 70, height - 70);

        if (!musicEnabled) {
            line(width - 70, height - 70, width - 20, height - 20);
            line(width - 20, height - 70, width - 70, height - 20);
        }

        if (!backgroundSong.isPlaying() && musicEnabled) {
            backgroundSong.play();
        }
    } else {    
        noStroke();
        fill(250, 100, 150);
        textSize(80);
        textAlign(CENTER);
        text("Click to start!", width/2, height/2);
    }
}