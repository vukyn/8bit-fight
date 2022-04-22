const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);

const key = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

// Create 2 Fighters with initial states (P1 and P2)
// const player1 = CHAR_RYUMA;
// const player1 = CHAR_SNAPE;
const player1 = CHAR_TARZAN;
const player2 = CHAR_RONIN;

// Create sprites with initial states
const stage = new Sprite({
    position: { x: 0, y: 0 },
    imgsrc: './img/stage/stage1.png'
});
const shop = new Sprite({
    position: { x: 600, y: 160 },
    imgsrc: './img/sprite/shop.png',
    scale: 2.5,
    framesMax: 6
});

// A loop with Sprite.update always updates the state and behavior of the sprite
function animate() {
    window.requestAnimationFrame(animate);

    // Create black background
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    stage.update();
    shop.update();

    // Create transparent white background
    c.fillStyle = 'rgba(255, 255, 255, 0.12)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    player1.update();
    player2.update();
    player1.speed.x = 0;
    player2.speed.x = 0;

    // player1 movement
    if (key.a.pressed && player1.lastKey === 'a' && player1.position.x > 0) {
        player1.speed.x = -5;
        player1.switchSprite('run');
    }
    else if (key.d.pressed && player1.lastKey === 'd' && (player1.position.x + player1.dimension.width) < canvas.width) {
        player1.speed.x = 5;
        player1.switchSprite('run');
    } else
        player1.switchSprite('idle');

    // player1 jump or fall
    if (player1.speed.y < 0)
        player1.switchSprite('jump');
    else if (player1.speed.y > 0)
        player1.switchSprite('fall')

    // player2 movement
    if (key.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft' && player2.position.x > 0) {
        player2.speed.x = -5;
        player2.switchSprite('run');
    }
    else if (key.ArrowRight.pressed && player2.lastKey === 'ArrowRight' && (player2.position.x + player2.dimension.width) < canvas.width) {
        player2.speed.x = 5;
        player2.switchSprite('run');
    } else
        player2.switchSprite('idle');

    // player2 jump or fall
    if (player2.speed.y < 0)
        player2.switchSprite('jump');
    else if (player2.speed.y > 0)
        player2.switchSprite('fall')

    // Detect collisions and gets hit - Player1 normalAttack
    if (player1.isNormalAttacking) {
        if (player1.framesCurrent === player1.sprites.normalAttack.framesAttackHit &&
            determineCollision({ fighter1: player1, fighter2: player2 })) {
            player2.takeHit(player1.normalDamage);
            player1.isNormalAttacking = false;
            gsap.to('#player2-remaining-health', {
                width:
                    ((player2.remainingHealth / player2.maxHealth) * 100 < 0 ? 0 :
                        (player2.remainingHealth / player2.maxHealth) * 100) + '%'
            });
        }
    }

    // Detect collisions and gets hit - Player1 heavyAttack
    if (player1.isHeavyAttacking) {
        if (player1.framesCurrent === player1.sprites.heavyAttack.framesAttackHit &&
            determineCollision({ fighter1: player1, fighter2: player2 })) {
            player2.takeHit(player1.heavyDamage);
            player1.isHeavyAttacking = false;
            gsap.to('#player2-remaining-health', {
                width:
                    ((player2.remainingHealth / player2.maxHealth) * 100 < 0 ? 0 :
                        (player2.remainingHealth / player2.maxHealth) * 100) + '%'
            });
        }
    }

    // Detect collisions and gets hit - Player2 normalAttack
    if (player2.isNormalAttacking) {
        if (player2.framesCurrent === player2.sprites.normalAttack.framesAttackHit &&
            determineCollision({ fighter1: player2, fighter2: player1 })) {
            player1.takeHit(player2.normalDamage);
            player2.isNormalAttacking = false;
            gsap.to('#player1-remaining-health', {
                width:
                    ((player1.remainingHealth / player1.maxHealth) * 100 < 0 ? 0 :
                        (player1.remainingHealth / player1.maxHealth) * 100) + '%'
            });
        }
    }

    // Detect collisions and gets hit - Player2 heavyAttack
    if (player2.isHeavyAttacking) {
        if (player2.framesCurrent === player2.sprites.heavyAttack.framesAttackHit &&
            determineCollision({ fighter1: player2, fighter2: player1 })) {
            player1.takeHit(player2.heavyDamage);
            player2.isHeavyAttacking = false;
            gsap.to('#player1-remaining-health', {
                width:
                    ((player1.remainingHealth / player1.maxHealth) * 100 < 0 ? 0 :
                        (player1.remainingHealth / player1.maxHealth) * 100) + '%'
            });
        }
    }

    // Detect if misses
    if (player1.isNormalAttacking && player1.framesCurrent === player1.sprites.normalAttack.framesAttackHit)
        player1.isNormalAttacking = false;
    if (player2.isNormalAttacking && player2.framesCurrent === player2.sprites.normalAttack.framesAttackHit)
        player2.isNormalAttacking = false;
    if (player1.isHeavyAttacking && player1.framesCurrent === player1.sprites.heavyAttack.framesAttackHit)
        player1.isHeavyAttacking = false;
    if (player2.isHeavyAttacking && player2.framesCurrent === player2.sprites.heavyAttack.framesAttackHit)
        player2.isHeavyAttacking = false;


    //End game on health change
    if (player1.remainingHealth <= 0 || player2.remainingHealth <= 0) {
        determineWinner({ player1, player2, timer });
    }
}

descreaseTimer();
animate();