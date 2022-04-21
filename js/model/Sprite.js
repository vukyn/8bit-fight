// // A class represent for the state and behavior of a sprite
class Sprite {
    constructor({ 
        position, imgsrc, scale = 1, 
        framesMax = 1, 
        framesHold = 7, 
        dimension = { width: 50, height: 150 },
        offset = { x: 0, y: 0 } }) {
        this.position = position;
        this.dimension = dimension
        this.image = new Image();
        this.image.src = imgsrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesHold = framesHold;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.offset = offset;
    }

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );
    }

    animateFrames() {
        // Draw frame by frame
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) this.framesCurrent++;
            else this.framesCurrent = 0;
        }
    }

    update() {
        this.draw();
        this.animateFrames();
    }
}