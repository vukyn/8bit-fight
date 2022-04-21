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
const player = new Fighter({
    position: { x: 100, y: 150 },
    velocity: { x: 0, y: 0 },
    offset: { x: 218, y: 194 },
    dimension: { width: 60, height: 110 },
    attackBox: { offset: { x: 115, y: 0 }, width: 138, height: 65 },
    imgsrc: './img/fighter/mack/Idle.png',
    scale: 2.5,
    framesMax: 8,
    framesHold: 5,
    maxHealth: 120,
    remainingHealth: 120,
    normalDamage: 15,
    specialDamage: 30,
    sprites: {
        idle: {
            imgsrc: './img/fighter/mack/Idle.png',
            framesMax: 8
        },
        run: {
            imgsrc: './img/fighter/mack/Run.png',
            framesMax: 8
        },
        jump: {
            imgsrc: './img/fighter/mack/Jump.png',
            framesMax: 2
        },
        fall: {
            imgsrc: './img/fighter/mack/Fall.png',
            framesMax: 2
        },
        attack1: {
            imgsrc: './img/fighter/mack/Attack1.png',
            framesMax: 6,
            framesAttackHit: 4
        },
        attack2: {
            imgsrc: './img/fighter/mack/Attack2.png',
            framesMax: 6,
            framesAttackHit: 4
        },
        takehit: {
            imgsrc: './img/fighter/mack/Take Hit.png',
            framesMax: 4
        },
        death: {
            imgsrc: './img/fighter/mack/Death.png',
            framesMax: 6
        }
    }
});
const enemy = new Fighter({
    position: { x: 900, y: 150 },
    velocity: { x: 0, y: 0 },
    offset: { x: 215, y: 198 },
    dimension: { width: 52, height: 121 },
    attackBox: { offset: { x: -174, y: 10 }, width: 130, height: 60 },
    imgsrc: './img/fighter/kenji/Idle.png',
    scale: 2.5,
    framesMax: 4,
    framesHold: 7,
    maxHealth: 90,
    remainingHealth: 90,
    normalDamage: 10,
    specialDamage: 25,
    sprites: {
        idle: {
            imgsrc: './img/fighter/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imgsrc: './img/fighter/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imgsrc: './img/fighter/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imgsrc: './img/fighter/kenji/Fall.png',
            framesMax: 2
        },
        attack1: {
            imgsrc: './img/fighter/kenji/Attack1.png',
            framesMax: 4,
            framesAttackHit: 2
        },
        attack2: {
            imgsrc: './img/fighter/kenji/Attack2.png',
            framesMax: 4,
            framesAttackHit: 2
        },
        takehit: {
            imgsrc: './img/fighter/kenji/Take Hit.png',
            framesMax: 3
        },
        death: {
            imgsrc: './img/fighter/kenji/Death.png',
            framesMax: 7
        }
    }
});

// // Create sprites with initial states
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

    player.update();
    enemy.update();
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // Player movement
    if (key.a.pressed && player.lastKey === 'a' && player.position.x > 0) {
        player.velocity.x = -5;
        player.switchSprite('run');
    }
    else if (key.d.pressed && player.lastKey === 'd' && (player.position.x + player.dimension.width) < canvas.width) {
        player.velocity.x = 5;
        player.switchSprite('run');
    } else
        player.switchSprite('idle');

    // Player jump or fall
    if (player.velocity.y < 0)
        player.switchSprite('jump');
    else if (player.velocity.y > 0)
        player.switchSprite('fall')

    // Enemy movement
    if (key.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && enemy.position.x > 0) {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    }
    else if (key.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && (enemy.position.x + enemy.dimension.width) < canvas.width) {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    } else
        enemy.switchSprite('idle');

    // Enemy jump or fall
    if (enemy.velocity.y < 0)
        enemy.switchSprite('jump');
    else if (enemy.velocity.y > 0)
        enemy.switchSprite('fall')

    // Detect collisions and gets hit
    if (determineCollision({ rectangle1: player, rectangle2: enemy }) &&
        player.framesCurrent === player.sprites.attack1.framesAttackHit &&
        player.isAttacking) {
        player.isAttacking = false;
        enemy.takeHit(player.normalDamage);
        gsap.to('#enemy-remaining-health', {
            width: (enemy.remainingHealth / enemy.maxHealth) * 100 + '%'
        });
    }
    if (determineCollision({ rectangle1: enemy, rectangle2: player }) &&
        enemy.framesCurrent === enemy.sprites.attack1.framesAttackHit &&
        enemy.isAttacking) {
        enemy.isAttacking = false;
        player.takeHit(enemy.normalDamage);
        gsap.to('#player-remaining-health', {
            width:  (player.remainingHealth / player.maxHealth) * 100 + '%'
        });
    }

    // Detect if misses
    if (player.isAttacking && player.framesCurrent === player.sprites.attack1.framesAttackHit)
        player.isAttacking = false;
    if (enemy.isAttacking && enemy.framesCurrent === enemy.sprites.attack1.framesAttackHit)
        enemy.isAttacking = false;

    //End game on health change
    if (player.remainingHealth <= 0 || enemy.remainingHealth <= 0) {
        determineWinner({ player, enemy, timer });
    }
}

window.addEventListener('keydown', (event) => {
    if (!isOver) {
        switch (event.key) {
            case 'd':
                key.d.pressed = true;
                player.lastKey = 'd';
                break;
            case 'a':
                key.a.pressed = true;
                player.lastKey = 'a';
                break;
            case 'w':
                if (player.position.y + player.dimension.height >= groundStage_Y)
                    player.velocity.y = -15;
                break;
            case ' ':
                if (!player.isAttacking)
                    player.attack();
                break;
            case 'ArrowRight':
                key.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                key.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
                break;
            case 'ArrowUp':
                if (enemy.position.y + enemy.dimension.height >= canvas.height - 97)
                    enemy.velocity.y = -15;
                break;
            case 'ArrowDown':
                if (!enemy.isAttacking)
                    enemy.attack();
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