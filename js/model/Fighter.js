// A class represent for the state and behavior of a fighter
class Fighter extends Sprite {
    constructor({
        position, velocity, sprites, imgsrc, scale = 1,
        maxHealth = 100, remainingHealth = 100,
        normalDamage = 10, specialDamage = 30,
        framesMax = 1,
        framesHold = 7,
        offset = { x: 0, y: 0 },
        dimension = { width: 50, height: 150 },
        attackBox = { offset: { x: 0, y: 0 }, width: 0, height: 0 } }) {
        super({ position, imgsrc, scale, framesMax, framesHold, offset, dimension });
        this.velocity = velocity;
        this.lastKey;
        this.isAttacking;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.maxHealth = maxHealth;
        this.remainingHealth = remainingHealth;
        this.normalDamage = normalDamage;
        this.specialDamage = specialDamage;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.sprites = sprites;
        this.isDead = false;
        this.atkCount = 0;
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imgsrc;
        }
    }

    update() {
        this.draw();
        if (!this.isDead) this.animateFrames();

        // Draw fighter
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        //c.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);

        // Draw attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);

        // Gravity control
        const gravity = 0.7;
        if (this.position.y + this.dimension.height + this.velocity.y >= groundStage_Y) {
            this.velocity.y = 0;
            this.position.y = groundStage_Y - this.dimension.height;
        }
        else this.velocity.y += gravity;
    }

    attack() {
        this.switchSprite('attack1');
        if (this.framesCurrent === 0) {
            this.isAttacking = true;
        }
    }

    takeHit(damage) {
        this.remainingHealth -= damage;
        console.log('dmg: ' + damage);
        console.log(this.remainingHealth);
        if (this.remainingHealth <= 0)
            this.switchSprite('death');
        else this.switchSprite('takehit');
    }

    switchSprite(sprite) {
        //Overriding all other animations with the attack animation
        if (this.image === this.sprites.attack1.image &&
            this.framesCurrent < this.sprites.attack1.framesMax - 1)
            return;

        //Overriding all other animations with the take hit animation
        if (this.image === this.sprites.takehit.image &&
            this.framesCurrent < this.sprites.takehit.framesMax - 1)
            return;

        //Overriding all other animations with the death animation
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax - 1)
                this.isDead = true;
            return
        };

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0;
                }
                break;
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0;
                }
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0;
                }
                break;
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0;
                }
                break;
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image;
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0;
                }
                break;
            case 'attack2':
                if (this.image !== this.sprites.attack2.image) {
                    this.image = this.sprites.attack2.image;
                    this.framesMax = this.sprites.attack2.framesMax
                    this.framesCurrent = 0;
                }
                break;
            case 'takehit':
                if (this.image !== this.sprites.takehit.image) {
                    this.image = this.sprites.takehit.image;
                    this.framesMax = this.sprites.takehit.framesMax
                    this.framesCurrent = 0;
                }
                break;
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image;
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0;
                }
                break;
        }
    }
}