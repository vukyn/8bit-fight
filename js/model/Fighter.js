// A class represent for the state and behavior of a fighter
class Fighter extends Sprite {
    constructor({
        position, speed, name, sprites, imgsrc, scale = 1,
        maxHealth = 100, remainingHealth = 100,
        normalDamage = 10, heavyDamage = 30, defense = 0,
        framesMax = 1,
        framesHold = 7,
        offset = { x: 0, y: 0 },
        dimension = { width: 50, height: 150 },
        attackBox = { offset: { x: 0, y: 0 }, width: 0, height: 0 } }) {
        super({ position, imgsrc, scale, framesMax, framesHold, offset, dimension });
        this.name = name;
        this.speed = speed;
        this.lastKey;
        this.isNormalAttacking;
        this.isHeavyAttacking;
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
        this.heavyDamage = heavyDamage;
        this.defense = defense
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
        c.fillStyle = 'black';
        
        if (!this.isDead) this.animateFrames();

        // Draw fighter
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        // c.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);

        // Draw attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);

        // Gravity control
        const gravity = 0.7;
        if (this.position.y + this.dimension.height + this.speed.y >= groundStage_Y) {
            this.speed.y = 0;
            this.position.y = groundStage_Y - this.dimension.height;
        }
        else this.speed.y += gravity;
    }

    normalAttack() {
        this.switchSprite('normalAttack');
        if (this.framesCurrent === 0) {
            this.isNormalAttacking = true;
        }
    }

    heavyAttack() {
        this.switchSprite('heavyAttack');
        if (this.framesCurrent === 0) {
            this.isHeavyAttacking = true;
        }
    }

    takeHit(damage) {
        this.remainingHealth -= damage;
        if (this.remainingHealth <= 0)
            this.switchSprite('death');
        else this.switchSprite('takehit');
    }

    switchSprite(sprite) {
        //Overriding all other animations with the normal attack animation
        if (this.image === this.sprites.normalAttack.image &&
            this.framesCurrent < this.sprites.normalAttack.framesMax - 1)
            return;

        //Overriding all other animations with the heavy attack animation
        if (this.image === this.sprites.heavyAttack.image &&
            this.framesCurrent < this.sprites.heavyAttack.framesMax - 1)
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
            case 'normalAttack':
                if (this.image !== this.sprites.normalAttack.image) {
                    this.image = this.sprites.normalAttack.image;
                    this.framesMax = this.sprites.normalAttack.framesMax
                    this.framesCurrent = 0;
                }
                break;
            case 'heavyAttack':
                if (this.image !== this.sprites.heavyAttack.image) {
                    this.image = this.sprites.heavyAttack.image;
                    this.framesMax = this.sprites.heavyAttack.framesMax
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