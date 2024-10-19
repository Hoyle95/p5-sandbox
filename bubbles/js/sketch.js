// Variables for the game state
let popSound;
let backgroundSong;
let roundEnd;
let round;
let tileSize = 100;
let maxBubbles;
let numberOfBubbles;
let bubblesPopped;
let bubbles = [];
let musicEnabled;
let muteButton;

function preload() {
  // Load sounds
  popSound = loadSound('/p5-sandbox/bubbles/assets/sound/pop.wav');
  backgroundSong = loadSound('/p5-sandbox/bubbles/assets/sound/burning_purple.wav');
  
  // Load images
  muteButton = loadImage('/p5-sandbox/bubbles/assets/images/mute.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  musicEnabled = true;
  
  // Starting state
  roundEnd = true;
  round = 0;
  numberOfBubbles = 0;
  bubblesPopped = 0;
}

function draw() {
  // Clear screen
  background(250);
  
  // Draw background tiles
  for (let y = 0; y < height; y += tileSize) {
    for (let x = 0; x < width; x += tileSize) {
      fill(240);
      stroke(100);
      rect(x, y, tileSize, tileSize);
    }
  }
  
  // Draw click me prompt at start
  if (round === 0) {
    fill(100, 100);
    textSize(128);
    textAlign(CENTER);
    text("Click me", width / 2, height / 2);
  } else {
    // Start music once round 1 starts
    if (!backgroundSong.isPlaying() && musicEnabled) {
      backgroundSong.play();
    }
  }
  
  // Draw and update active bubbles
  for (let i = 0; i < numberOfBubbles; i++) {
    bubbles[i].animate();
  }
  
  // Bubble machine
  if (numberOfBubbles < maxBubbles && round !== 0 && random(100) < 6) {
    numberOfBubbles++;
  }
  
  // If all bubbles are popped, show victory screen
  if (bubblesPopped === maxBubbles && round !== 0) {
    fill(250, 100, 150);
    textSize(128);
    textAlign(CENTER);
    text("YOU WIN!", width / 2, height / 2);
    roundEnd = true;
  }
  
  // UI text
  fill(250, 100, 150);
  textSize(40);
  textAlign(LEFT);
  text(`Bubbles ${numberOfBubbles - bubblesPopped}`, 20, 50);
  textAlign(RIGHT);
  text(`${bubblesPopped} Popped`, width - 20, 50);
  textAlign(CENTER);
  text(`Round ${round}`, width / 2, 50);
  
  // Mute button
  noFill();
  stroke(0);
  image(muteButton, width - 70, height - 70);
  if (!musicEnabled) {
    line(width - 70, height - 70, width - 20, height - 20);
    line(width - 20, height - 70, width - 70, height - 20);
  }
}

function mousePressed() {
  // If round has ended
  if (roundEnd) {
    // Waits for click to start game, or starts the next round
    if (round !== 0) {
      round++;
      roundEnd = false;
      maxBubbles *= 2;
      numberOfBubbles = 0;
      bubblesPopped = 0;
      bubbles = new Array(maxBubbles).fill().map(() => new Bubble());
    } else {
      roundEnd = false;
      maxBubbles = 10;
      round++;
      bubbles = new Array(maxBubbles).fill().map(() => new Bubble());
    }
  } else {
    // Check if click is inside of a bubble
    for (let i = 0; i < numberOfBubbles; i++) {
      if (bubbles[i].clicked()) {
        bubblesPopped++;
        popSound.setVolume(map(bubbles[i].size, 15, 100, 2.5, 0.5));
        popSound.play();
      }
    }
  }
  
  // Mute button
  if (mouseX > width - 70 && mouseX < width - 20 && mouseY > height - 70 && mouseY < height - 20) {
    if (musicEnabled) {
      musicEnabled = false;
      backgroundSong.stop();
    } else {
      musicEnabled = true;
      if (!backgroundSong.isPlaying()) {
        backgroundSong.loop();
      }
    }
  }
}

class Bubble {
  constructor() {
    this.speed = random(0.5, 5);
    this.size = random(15, 100);
    this.x = random(this.size / 2, width - (this.size / 2));
    this.y = height + (this.size / 2);
    this.r = random(150, 200);
    this.g = random(100, 200);
    this.b = random(200, 250);
    this.enabled = true;
  }

  animate() {
    if (this.enabled) {
      stroke(this.r, this.g, this.b);
      fill(this.r, this.g, this.b, 100);
      ellipse(this.x, this.y, this.size, this.size);
      this.y -= random(this.speed);
      this.x += random(-this.speed / 2, this.speed / 2);

      if (this.x < this.size / 2) {
        this.x += this.speed;
      }

      if (this.x > width - (this.size / 2)) {
        this.x -= this.speed;
      }

      if (this.y < -(this.size / 2)) {
        this.y = height + (this.size / 2);
      }
    }
  }

  clicked() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < this.size / 2 && this.enabled) {
      this.enabled = false;
      return true;
    }
    return false;
  }
}