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

    // // Detect collisions and gets hit
    // if (determineCollision({ rectangle1: player1, rectangle2: player2 }) &&
    //     player1.framesCurrent === player1.sprites.normalAttack.framesAttackHit &&
    //     player1.isNormalAttacking) {
    //     player1.isNormalAttacking = false;
    //     player2.takeHit(player1.normalDamage);
    //     gsap.to('#player2-remaining-health', {
    //         width: (player2.remainingHealth / player2.maxHealth) * 100 + '%'
    //     });
    // }
    // if (determineCollision({ rectangle1: player2, rectangle2: player1 }) &&
    //     player2.framesCurrent === player2.sprites.normalAttack.framesAttackHit &&
    //     player2.isNormalAttacking) {
    //     player2.isNormalAttacking = false;
    //     player1.takeHit(player2.normalDamage);
    //     gsap.to('#player1-remaining-health', {
    //         width: (player1.remainingHealth / player1.maxHealth) * 100 + '%'
    //     });
    // }

    // // Detect if misses
    // if (player1.isNormalAttacking && player1.framesCurrent === player1.sprites.normalAttack.framesAttackHit)
    //     player1.isNormalAttacking = false;
    // if (player2.isNormalAttacking && player2.framesCurrent === player2.sprites.normalAttack.framesAttackHit)
    //     player2.isNormalAttacking = false;

    // Detect collisions and gets hit
    if (determineCollision({ rectangle1: player1, rectangle2: player2 }) &&
        player1.framesCurrent === player1.sprites.normalAttack.framesAttackHit &&
        (player1.isNormalAttacking || player1.isHeavyAttacking)) {
        if (player1.isNormalAttacking) player2.takeHit(player1.normalDamage);
        else if (player1.isHeavyAttacking) player2.takeHit(player1.heavyDamage);
        player1.isNormalAttacking = false;
        player1.isHeavyAttacking = false;
        gsap.to('#player2-remaining-health', {
            width:
                ((player2.remainingHealth / player2.maxHealth) * 100 < 0 ? 0 :
                    (player2.remainingHealth / player2.maxHealth) * 100) + '%'
        });
    }
    if (determineCollision({ rectangle1: player2, rectangle2: player1 }) &&
        player2.framesCurrent === player2.sprites.normalAttack.framesAttackHit &&
        (player2.isNormalAttacking || player2.isHeavyAttacking)) {
        if (player2.isNormalAttacking) player1.takeHit(player2.normalDamage);
        else if (player2.isHeavyAttacking) player1.takeHit(player2.heavyDamage);
        player2.isNormalAttacking = false;
        player2.isHeavyAttacking = false;
        gsap.to('#player1-remaining-health', {
            width:
                ((player1.remainingHealth / player1.maxHealth) * 100 < 0 ? 0 :
                    (player1.remainingHealth / player1.maxHealth) * 100) + '%'
        });
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

window.addEventListener('keydown', (event) => {
    if (!isOver) {
        switch (event.key) {
            case 'd':
                key.d.pressed = true;
                player1.lastKey = 'd';
                break;
            case 'a':
                key.a.pressed = true;
                player1.lastKey = 'a';
                break;
            case 'w':
                if (player1.position.y + player1.dimension.height >= groundStage_Y)
                    player1.speed.y = -15;
                break;
            case 'g':
                if (!player1.isNormalAttacking)
                    player1.normalAttack();
                break;
            case 'h':
                if (!player1.isHeavyAttacking)
                    player1.heavyAttack();
                break;
            case 'ArrowRight':
                key.ArrowRight.pressed = true;
                player2.lastKey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                key.ArrowLeft.pressed = true;
                player2.lastKey = 'ArrowLeft';
                break;
            case 'ArrowUp':
                if (player2.position.y + player2.dimension.height >= canvas.height - 97)
                    player2.speed.y = -15;
                break;
            case '4':
                if (!player2.isNormalAttacking)
                    player2.normalAttack();
                break;
            case '5':
                if (!player2.isHeavyAttacking)
                    player2.heavyAttack();
                break;
            default:
                break;
        }
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            key.d.pressed = false;
            break;
        case 'a':
            key.a.pressed = false;
            break;
        case 'ArrowRight':
            key.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            key.ArrowLeft.pressed = false;
            break;
        default:
            break;
    }
});

descreaseTimer();
animate();