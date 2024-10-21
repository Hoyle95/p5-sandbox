class Bubble {
    constructor(){
        this.speedX = random(0.1, 1);
        this.speedY = random(0.1, 5);
        this.size = random(20, 100);
        this.x = random(this.size / 2, width - (this.size / 2));
        this.y = height + (this.size / 2);
        this.r = random(150, 200);
        this.g = random(100, 200);
        this.b = random(200, 250);
        this.pop = new Audio('/p5-sandbox/bubbles/sound/pop.wav');
    }

    draw() {
        this.x += random(-this.speedX, this.speedX);
        this.y -= random(0.1,this.speedY);

        if (this.x < this.size / 2) {
            this.x = this.size / 2;
        }

        if (this.x > width - (this.size / 2)) {
            this.x = width - (this.size / 2);
        }

        if (this.y < 0-(this.size)) {
            this.y = height + (this.size/2);
        }

        stroke(this.r, this.g, this.b);
        fill(this.r, this.g, this.b, 100);
        circle(this.x, this.y, this.size);
    }

    colisionCheck(x, y) { 
        if (dist(x, y, this.x, this.y) < (this.size / 2)) {
            this.pop.play();
            return true;
        } else {
            return false;
        }
    }
}