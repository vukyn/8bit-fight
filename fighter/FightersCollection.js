const CHAR_RYUMA = new Fighter({
    name: 'Ryuma',
    position: { x: 100, y: 150 },
    speed: { x: 0, y: 0 },
    offset: { x: 218, y: 194 },
    dimension: { width: 60, height: 110 },
    normalAttackBox: { offset: { x: 115, y: 0 }, width: 138, height: 65 },
    heavyAttackBox: { offset: { x: 115, y: 0 }, width: 138, height: 65 },
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
        normalAttack: {
            imgsrc: './img/fighter/ryuma/Attack1.png',
            framesMax: 6,
            framesAttackHit: 4
        },
        heavyAttack: {
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
    normalAttackBox: { offset: { x: -173, y: -15 }, width: 100, height: 105 },
    heavyAttackBox: { offset: { x: -180, y: -50 }, width: 110, height: 150 },
    imgsrc: './img/fighter/ronin/Idle.png',
    scale: 2.5,
    framesMax: 4,
    framesHold: 7,
    maxHealth: 95,
    remainingHealth: 95,
    normalDamage: 15,
    heavyDamage: 35,
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
        normalAttack: {
            imgsrc: './img/fighter/ronin/Attack1.png',
            framesMax: 4,
            framesAttackHit: 2
        },
        heavyAttack: {
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
const CHAR_SNAPE = new Fighter({
    name: 'Snape',
    position: { x: 100, y: 150 },
    speed: { x: 0, y: 0 },
    offset: { x: 218, y: 174 },
    dimension: { width: 60, height: 130 },
    normalAttackBox: { offset: { x: 80, y: 20 }, width: 98, height: 60 },
    heavyAttackBox: { offset: { x: 80, y: 20 }, width: 98, height: 60 },
    imgsrc: './img/fighter/ryuma/Idle.png',
    scale: 3,
    framesMax: 8,
    framesHold: 5,
    maxHealth: 120,
    remainingHealth: 120,
    normalDamage: 15,
    heavyDamage: 30,
    defense: 25,
    sprites: {
        idle: {
            imgsrc: './img/fighter/snape/Idle.png',
            framesMax: 10
        },
        run: {
            imgsrc: './img/fighter/snape/Run.png',
            framesMax: 8
        },
        jump: {
            imgsrc: './img/fighter/snape/Jump.png',
            framesMax: 3
        },
        fall: {
            imgsrc: './img/fighter/snape/Fall.png',
            framesMax: 3
        },
        normalAttack: {
            imgsrc: './img/fighter/snape/Attack1.png',
            framesMax: 7,
            framesAttackHit: 4
        },
        heavyAttack: {
            imgsrc: './img/fighter/snape/Attack3.png',
            framesMax: 8,
            framesAttackHit: 4
        },
        takehit: {
            imgsrc: './img/fighter/snape/Take Hit.png',
            framesMax: 3
        },
        death: {
            imgsrc: './img/fighter/snape/Death.png',
            framesMax: 7
        }
    }
});
const CHAR_TARZAN = new Fighter({
    name: 'Tarzan',
    position: { x: 100, y: 150 },
    speed: { x: 0, y: 0 },
    offset: { x: 160, y: 108 },
    dimension: { width: 70, height: 125 },
    normalAttackBox: { offset: { x: 100, y: 45 }, width: 97, height: 50 },
    heavyAttackBox: { offset: { x: 125, y: -65 }, width: 69, height: 150 },
    imgsrc: './img/fighter/tarzan/Idle.png',
    scale: 2.85,
    framesMax: 8,
    framesHold: 5,
    maxHealth: 230,
    remainingHealth: 230,
    normalDamage: 10,
    heavyDamage: 15,
    defense: 25,
    sprites: {
        idle: {
            imgsrc: './img/fighter/tarzan/Idle.png',
            framesMax: 10
        },
        run: {
            imgsrc: './img/fighter/tarzan/Run.png',
            framesMax: 8
        },
        jump: {
            imgsrc: './img/fighter/tarzan/Jump.png',
            framesMax: 3
        },
        fall: {
            imgsrc: './img/fighter/tarzan/Fall.png',
            framesMax: 3
        },
        normalAttack: {
            imgsrc: './img/fighter/tarzan/Attack3.png',
            framesMax: 9,
            framesAttackHit: 6
        },
        heavyAttack: {
            imgsrc: './img/fighter/tarzan/Attack2.png',
            framesMax: 6,
            framesAttackHit: 3
        },
        takehit: {
            imgsrc: './img/fighter/tarzan/Take Hit.png',
            framesMax: 3
        },
        death: {
            imgsrc: './img/fighter/tarzan/Death.png',
            framesMax: 11
        }
    }
});