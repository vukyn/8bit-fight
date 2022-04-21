const CHAR_RYUMA = new Fighter({
    name: 'Ryuma',
    position: { x: 100, y: 150 },
    speed: { x: 0, y: 0 },
    offset: { x: 218, y: 194 },
    dimension: { width: 60, height: 110 },
    attackBox: { offset: { x: 115, y: 0 }, width: 138, height: 65 },
    imgsrc: './img/fighter/ryuma/Idle.png',
    scale: 2.5,
    framesMax: 8,
    framesHold: 5,
    maxHealth: 120,
    remainingHealth: 120,
    normalDamage: 15,
    heavyDamage: 30,
    defense: 25,
    sprites: {
        idle: {
            imgsrc: './img/fighter/ryuma/Idle.png',
            framesMax: 8
        },
        run: {
            imgsrc: './img/fighter/ryuma/Run.png',
            framesMax: 8
        },
        jump: {
            imgsrc: './img/fighter/ryuma/Jump.png',
            framesMax: 2
        },
        fall: {
            imgsrc: './img/fighter/ryuma/Fall.png',
            framesMax: 2
        },
        attack1: {
            imgsrc: './img/fighter/ryuma/Attack1.png',
            framesMax: 6,
            framesAttackHit: 4
        },
        attack2: {
            imgsrc: './img/fighter/ryuma/Attack2.png',
            framesMax: 6,
            framesAttackHit: 4
        },
        takehit: {
            imgsrc: './img/fighter/ryuma/Take Hit.png',
            framesMax: 4
        },
        death: {
            imgsrc: './img/fighter/ryuma/Death.png',
            framesMax: 6
        }
    }
});

const CHAR_RONIN = new Fighter({
    name: 'Ronin',
    position: { x: 900, y: 150 },
    speed: { x: 0, y: 0 },
    offset: { x: 215, y: 198 },
    dimension: { width: 52, height: 121 },
    attackBox: { offset: { x: -174, y: 10 }, width: 130, height: 60 },
    imgsrc: './img/fighter/ronin/Idle.png',
    scale: 2.5,
    framesMax: 4,
    framesHold: 7,
    maxHealth: 90,
    remainingHealth: 90,
    normalDamage: 10,
    heavyDamage: 25,
    defense: 20,
    sprites: {
        idle: {
            imgsrc: './img/fighter/ronin/Idle.png',
            framesMax: 4
        },
        run: {
            imgsrc: './img/fighter/ronin/Run.png',
            framesMax: 8
        },
        jump: {
            imgsrc: './img/fighter/ronin/Jump.png',
            framesMax: 2
        },
        fall: {
            imgsrc: './img/fighter/ronin/Fall.png',
            framesMax: 2
        },
        attack1: {
            imgsrc: './img/fighter/ronin/Attack1.png',
            framesMax: 4,
            framesAttackHit: 2
        },
        attack2: {
            imgsrc: './img/fighter/ronin/Attack2.png',
            framesMax: 4,
            framesAttackHit: 2
        },
        takehit: {
            imgsrc: './img/fighter/ronin/Take Hit.png',
            framesMax: 3
        },
        death: {
            imgsrc: './img/fighter/ronin/Death.png',
            framesMax: 7
        }
    }
});